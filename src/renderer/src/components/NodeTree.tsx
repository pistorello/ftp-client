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

  const handleExpand = (): void => {
    if (node.type === 2) {
      setExpanded(!expanded)
    }
  }

  return (
    <div>
      <div className="node" onClick={handleExpand}>
        {node.type === 2 &&
          (expanded ? <ChevronDown color="#ffffff" /> : <ChevronRight color="#ffffff" />)}

        {node.type === 2 ? <Folder color="#ffffff" /> : <File color="#ffffff" />}

        {`${node.name} | ${node.type}`}
      </div>

      {expanded && node.children && (
        <div className="children">
          {node.children.map((child, index) => (
            <NodeItem key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  )
}

export default NodeTree
