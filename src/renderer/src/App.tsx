import { FileInfo } from 'basic-ftp'
import { useState } from 'react'
import NodeTree, { Node } from './components/NodeTree'
import fileToNode from './utils/functions'

function App(): JSX.Element {
  const [host, setHost] = useState<string>('ftp.pistorello.com')
  const [user, setUser] = useState<string>('u506320054')
  const [password, setPassword] = useState<string>('Leozinhoputodavidanessamerda14@')
  const [files, setFiles] = useState<FileInfo[]>([])

  const ipcStartClient = async (): Promise<void> => {
    await window.ftp.startClient(host, user, password)
  }

  const ipcStopClient = async (): Promise<void> => {
    await window.ftp.stopClient()
  }

  const ipcListFiles = async (): Promise<void> => {
    const files = await window.ftp.listFiles()
    setFiles(files)
  }

  const nodes: Node[] = fileToNode(files)

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
        <NodeTree nodes={nodes} />
      </main>
    </div>
  )
}

export default App
