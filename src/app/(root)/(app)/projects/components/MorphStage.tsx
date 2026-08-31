'use client'

import { gsap } from 'gsap'
import { Mesh, Program, Renderer, Texture, Triangle } from 'ogl'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform sampler2D tCurrent;
uniform sampler2D tNext;
uniform vec2 uResolution;
uniform vec2 uCurrentSize;
uniform vec2 uNextSize;
uniform float uProgress;
uniform float uIntensity;
uniform float uScale;
uniform float uAberration;
uniform float uTime;
uniform float uActive;
uniform vec3 uOverlay;

varying vec2 vUv;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

// CONTAIN fit (letterbox), matching the resting <img>'s object-contain — not
// cover/crop — so there is no size/crop pop the instant the canvas hands off
// to the plain <img> at the end of a transition. The inside flag marks UV
// that landed outside the fitted image (the letterbox bars).
vec2 fitUV(vec2 uv, vec2 res, vec2 img, out float inside) {
  float rA = res.x / max(res.y, 1.0);
  float iA = img.x / max(img.y, 1.0);
  vec2 s = vec2(1.0);
  float ratio = rA / max(iA, 0.0001);
  if (ratio > 1.0) { s.x = ratio; } else { s.y = 1.0 / ratio; }
  vec2 mapped = (uv - 0.5) * s + 0.5;
  inside = step(0.0, mapped.x) * step(mapped.x, 1.0) * step(0.0, mapped.y) * step(mapped.y, 1.0);
  return mapped;
}

void main() {
  float p = clamp(uProgress, 0.0, 1.0);
  vec2 uv = vUv;

  // uActive is 0 at rest so idle time-evolving noise can never displace or
  // blend in the "next" frame — the settled image stays pixel-locked instead
  // of intermittently ghosting/flashing as uTime drifts the fbm field.
  float nn = fbm(uv * uScale + uTime * 0.03);
  float warp = fbm(uv * uScale * 1.7 - uTime * 0.02);
  vec2 g = (vec2(nn, warp) - 0.5) * uActive;
  vec2 uvC = uv + g * uIntensity * 0.5 * p;
  vec2 uvN = uv - g * uIntensity * 0.5 * (1.0 - p);
  float m = smoothstep(nn - 0.15, nn + 0.15, p) * uActive;

  float insideC = 1.0;
  float insideN = 1.0;
  vec2 sC = fitUV(uvC, uResolution, uCurrentSize, insideC);
  vec2 sN = fitUV(uvN, uResolution, uNextSize, insideN);

  float env = sin(p * 3.14159265) * uActive;
  float ca = uAberration * env * 0.03;

  vec3 colC = vec3(
    texture2D(tCurrent, sC + vec2(ca, 0.0)).r,
    texture2D(tCurrent, sC).g,
    texture2D(tCurrent, sC - vec2(ca, 0.0)).b
  );
  vec3 colN = vec3(
    texture2D(tNext, sN + vec2(ca, 0.0)).r,
    texture2D(tNext, sN).g,
    texture2D(tNext, sN - vec2(ca, 0.0)).b
  );
  colC = mix(uOverlay, colC, insideC);
  colN = mix(uOverlay, colN, insideN);

  vec3 col = mix(colC, colN, m);
  float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
  col = mix(col, uOverlay, (1.0 - vig) * 0.22);

  gl_FragColor = vec4(col, 1.0);
}
`

function makeFallbackTexture(gl: any) {
  const size = 4
  const data = new Uint8Array(size * size * 4)
  for (let i = 0; i < size * size; i++) {
    data[i * 4] = 10
    data[i * 4 + 1] = 10
    data[i * 4 + 2] = 12
    data[i * 4 + 3] = 255
  }
  return new Texture(gl, { image: data, width: size, height: size, generateMipmaps: false })
}

export interface MorphStageHandle {
  goTo: (dir: 1 | -1) => void
  jumpTo: (index: number) => void
}

interface MorphStageProps {
  images: string[]
  startIndex?: number
  intensity?: number
  scale?: number
  aberration?: number
  duration?: number
  onSettled?: (index: number) => void
}

const MorphStage = forwardRef<MorphStageHandle, MorphStageProps>(
  ({ images, startIndex = 0, intensity = 0.45, scale = 2.4, aberration = 0.28, duration = 0.85, onSettled }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const engineRef = useRef<any>(null)

    useImperativeHandle(ref, () => ({
      goTo: (dir: 1 | -1) => engineRef.current?.goTo(dir),
      jumpTo: (index: number) => engineRef.current?.jumpTo(index),
    }))

    useEffect(() => {
      const container = containerRef.current
      const restImg = imgRef.current
      if (!container || !restImg || images.length === 0) return undefined

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const renderer = new Renderer({ alpha: false, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) })
      const gl = renderer.gl
      gl.clearColor(0.04, 0.04, 0.05, 1)
      const canvas = gl.canvas as HTMLCanvasElement
      canvas.style.position = 'absolute'
      canvas.style.inset = '0'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.display = 'block'
      canvas.style.zIndex = '1'
      // The canvas only exists to render the ~1s morph itself. At rest it is
      // fully hidden and the plain <img> below is what's actually on screen —
      // a static <img> cannot flicker, so whatever the resting state looks
      // like is guaranteed stable regardless of any GPU/driver-level hiccup
      // in the shader loop.
      canvas.style.opacity = '0'
      container.appendChild(canvas)

      let current = Math.min(startIndex, images.length - 1)
      restImg.src = images[current]
      restImg.style.opacity = '1'

      const geometry = new Triangle(gl)
      // While a transition is in flight, `pending` names the target index.
      // The render loop re-reads textures[current]/textures[pending] every
      // frame (instead of capturing a texture object once at transition
      // start) so that a still-loading image swapping from its placeholder
      // to the real bitmap mid-flight is picked up automatically next frame,
      // rather than flashing in on its own whenever the network happens to
      // finish.
      let pending: number | null = null
      let animating = false
      let destroyed = false
      let tween: gsap.core.Tween | null = null

      const textures = images.map(() => makeFallbackTexture(gl))
      const sizes: [number, number][] = images.map(() => [1, 1])

      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          tCurrent: { value: textures[current] },
          tNext: { value: textures[current] },
          uResolution: { value: [1, 1] },
          uCurrentSize: { value: sizes[current] },
          uNextSize: { value: sizes[current] },
          uProgress: { value: 0 },
          uIntensity: { value: intensity },
          uScale: { value: scale },
          uAberration: { value: aberration },
          uTime: { value: 0 },
          uActive: { value: 0 },
          uOverlay: { value: [0.045, 0.045, 0.05] },
        },
      })
      const mesh = new Mesh(gl, { geometry, program })

      images.forEach((src, index) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          if (destroyed) return
          const texture = new Texture(gl, { generateMipmaps: false })
          texture.image = img
          textures[index] = texture
          sizes[index] = [img.naturalWidth || 1, img.naturalHeight || 1]
        }
      })

      const resize = () => {
        const rect = container.getBoundingClientRect()
        renderer.setSize(Math.max(rect.width, 1), Math.max(rect.height, 1))
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height]
      }
      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)
      resize()

      const wrap = (i: number) => ((i % images.length) + images.length) % images.length

      let raf = 0
      const loop = (t: number) => {
        program.uniforms.uTime.value = t * 0.001
        program.uniforms.tCurrent.value = textures[current]
        program.uniforms.uCurrentSize.value = sizes[current]
        const nextIndex = pending ?? current
        program.uniforms.tNext.value = textures[nextIndex]
        program.uniforms.uNextSize.value = sizes[nextIndex]
        renderer.render({ scene: mesh })
        raf = requestAnimationFrame(loop)
      }
      const startLoop = () => {
        if (!raf) raf = requestAnimationFrame(loop)
      }
      const stopLoop = () => {
        if (raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      }

      const goTo = (dir: 1 | -1) => {
        if (animating || images.length < 2) return
        const target = wrap(current + dir)
        pending = target
        animating = true
        program.uniforms.uProgress.value = 0
        program.uniforms.uActive.value = 1
        canvas.style.opacity = '1'
        restImg.style.opacity = '0'
        startLoop()
        const d = reducedMotion ? Math.min(duration, 0.3) : duration
        tween = gsap.fromTo(
          program.uniforms.uProgress,
          { value: 0 },
          {
            value: 1,
            duration: d,
            ease: 'power2.inOut',
            onComplete: () => {
              current = target
              pending = null
              program.uniforms.uProgress.value = 0
              program.uniforms.uActive.value = 0
              animating = false
              tween = null
              restImg.src = images[target]
              restImg.style.opacity = '1'
              canvas.style.opacity = '0'
              stopLoop()
              onSettled?.(target)
            },
          }
        )
      }
      const jumpTo = (index: number) => {
        if (animating) return
        const target = wrap(index)
        current = target
        pending = null
        restImg.src = images[target]
        restImg.style.opacity = '1'
        canvas.style.opacity = '0'
        onSettled?.(target)
      }
      engineRef.current = { goTo, jumpTo }

      return () => {
        destroyed = true
        stopLoop()
        if (tween) tween.kill()
        resizeObserver.disconnect()
        const ext = gl.getExtension('WEBGL_lose_context')
        if (ext) ext.loseContext()
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
        engineRef.current = null
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images])

    return (
      <div ref={containerRef} className="absolute inset-0">
        <img
          ref={imgRef}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain pointer-events-none"
          style={{ zIndex: 2, opacity: 0 }}
        />
      </div>
    )
  }
)

MorphStage.displayName = 'MorphStage'

export default MorphStage
