import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote-client/rsc'
import Code from './Code'
import Image from './Image'
import Link from './Link'
import Table from './Table'

const MDX: React.FC<MDXRemoteProps> = (props) => {
  return <MDXRemote {...props} components={{ Image, a: Link, code: Code, Table, ...(props.components || {}) }} />
}

export default MDX
