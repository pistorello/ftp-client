import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react'
import React, { useState } from 'react'

export interface Node {
  name: string
  isFolder: boolean
  children?: Node[]
}

const NodeTree: React.FC<{ node: Node }> = ({ node }) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleExpand = (): void => {
    if (node.isFolder) {
      setExpanded(!expanded)
    }
  }

  return (
    <div className="tree">
      <div className="node" onClick={handleExpand}>
        {node.isFolder &&
          (expanded ? <ChevronDown color="#ffffff" /> : <ChevronRight color="#ffffff" />)}

        {node.isFolder ? <Folder color="#ffffff" /> : <File color="#ffffff" />}

        {node.name}
      </div>

      {expanded && node.children && (
        <div className="children">
          {node.children.map((child, index) => (
            <NodeTree key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  )
}

export default NodeTree
