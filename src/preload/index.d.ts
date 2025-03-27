import { ElectronAPI } from '@electron-toolkit/preload'
import { FileInfo } from 'basic-ftp'

interface ftp {
  startClient: (host: string, user: string, password: string) => void
  stopClient: () => void
  listFiles: (path?: string) => FileInfo[]
}

declare global {
  interface Window {
    electron: ElectronAPI
    ftp: ftp
  }
}
