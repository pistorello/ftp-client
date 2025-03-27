import fileToNode from '../utils/functions'
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react'
import React, { useState } from 'react'

export interface Node {
  name: string
  type: number
  children?: Node[]
}

const NodeTree: React.FC<{ nodes: Node[] }> = ({ nodes }) => {
  return (
    <div className="tree">
      {nodes.map((item, index) => (
        <NodeItem node={item} key={index} />
      ))}
    </div>
  )
}

const NodeItem: React.FC<{ node: Node }> = ({ node }) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleExpand = async (): Promise<void> => {
    if (node.type === 2) {
      if (!expanded) {
        const files = await window.ftp.listFiles(node.name)

        node.children = fileToNode(files)
      }

      setExpanded(!expanded)
    }
  }

  return (
    <div>
      <div className="node" onClick={handleExpand}>
        {node.type === 2 &&
          (expanded ? <ChevronDown color="#ffffff" /> : <ChevronRight color="#ffffff" />)}

        {node.type === 2 ? <Folder color="#ffffff" /> : <File color="#ffffff" />}

        {`${node.name}`}
      </div>

      {expanded && node.children && node.type === 2 && (
        <div>
          {node.children.map((child, index) => (
            <NodeItem key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  )
}

export default NodeTree
