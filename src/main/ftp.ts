import { Client, FileInfo } from 'basic-ftp'
import dotenv from 'dotenv'

dotenv.config()

const silentLog = (): void => {
  /**/
}

const client = new Client()

export async function startClient(host: string, user: string, password: string): Promise<void> {
  if (!client.closed) {
    console.log('Connection already started.')
    return
  }

  client.ftp.verbose = false

  client.ftp.log = silentLog

  console.log('Establishing connection...')

  try {
    await client.access({
      host: host || '',
      user: user || '',
      password: password,
      secure: true,
      secureOptions: { rejectUnauthorized: false }
    })

    console.log('Connection established.')
  } catch (err) {
    console.log(err)
    return
  }

  await keepAlive()
}

export async function stopClient(): Promise<void> {
  if (!client.closed) {
    await client.close()
    console.log('Connection closed.')
  } else {
    console.log('Connection already closed.')
  }
}

async function keepAlive(): Promise<void> {
  setInterval(async () => {
    if (!client.closed) {
      try {
        await client.ftp.send('NOOP')
        console.log('keep-alive sended.')
      } catch (err) {
        console.log('keep-alive failed.')
      }
    }
  }, 10000)
}

export async function listFiles(): Promise<FileInfo[]> {
  return await client.list()
}
