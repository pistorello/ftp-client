import { FileInfo } from 'basic-ftp'
import { Node } from '../components/NodeTree'

function fileToNode(files: FileInfo[]): Node[] {
  console.log(files.length)

  let nodes: Node[] = []

  if (files.length > 0) {
    nodes = files.map((file) => ({
      name: file.name,
      type: file.type
    }))
  }

  return nodes
}

export default fileToNode
