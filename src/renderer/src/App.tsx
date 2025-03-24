import { FileInfo } from 'basic-ftp'
import { useState } from 'react'
import NodeTree, { Node } from './components/NodeTree'

function App(): JSX.Element {
  const [host, setHost] = useState<string>('')
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [files, setFiles] = useState<FileInfo[]>([])

  const ipcStartClient = async (): Promise<void> =>
    await window.ftp.startClient(host, user, password)

  const ipcStopClient = async (): Promise<void> => await window.ftp.stopClient()

  const ipcListFiles = async (): Promise<void> => {
    const files = await window.ftp.listFiles()
    setFiles(files)
  }

  const test: Node = (): void => {
    files.map((file) => {
      const node: Node = {
        name: file.name,
        isFolder: file.isFile
      }
      return node
    })
  }

  return (
    <div className="env">
      <header>
        <div>
          <input
            className="default-input"
            id="host"
            type="text"
            placeholder="Host:"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />

          <input
            className="default-input"
            id="user"
            type="text"
            placeholder="User:"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            className="default-input"
            id="password"
            type="password"
            placeholder="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="default-button" onClick={ipcStartClient}>
            Start Client
          </button>
          <button className="default-button" onClick={ipcStopClient}>
            Stop Client
          </button>
          <button className="default-button" onClick={ipcListFiles}>
            List Files
          </button>
        </div>
      </header>
      <main>
        <NodeTree node={test} />
      </main>
    </div>
  )
}

export default App
