import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { FileInfo } from 'basic-ftp'

// Custom APIs for renderer
const ftp = {
  startClient: async (host, user, password): Promise<void> =>
    await ipcRenderer.send('start-ftp', [host, user, password]),

  stopClient: async (): Promise<void> => await ipcRenderer.send('stop-ftp'),

  listFiles: async (): Promise<FileInfo[]> => {
    return await ipcRenderer.invoke('list-files')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('ftp', ftp)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.ftp = ftp
}
