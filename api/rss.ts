import {
  MongoClient,
  GridFSBucket,
  type Db,
  type MongoClient as MongoClientType,
} from 'mongodb'
import fs, { PathLike } from 'fs'

async function connectMongo(): Promise<
  MongoClientType | { error: string; details: string }
> {
  const client = new MongoClient('mongodb://localhost:27017')
  try {
    await client.connect()
    return client
  } catch (error) {
    console.error('Connection failed', error)
    return { error: 'Connection failed', details: (error as Error).message }
  }
}

export async function updateRss(): Promise<void> {
  const client = await connectMongo()
  if ('error' in client) {
    return
  }
}

export async function uploadFile(
  filePath: PathLike,
  fileName: string,
): Promise<void> {
  const client = await connectMongo()
  if ('error' in client) {
    return
  }

  const db: Db = client.db('replik')
  const bucket = new GridFSBucket(db)

  const uploadStream = bucket.openUploadStream(fileName)
  const fileStream = fs.createReadStream(filePath)
  fileStream.pipe(uploadStream).on('finish', () => {
    console.log('File uploaded')
  })
}

export async function downloadFile(fileName: string): Promise<void> {
  const client = await connectMongo()
  if ('error' in client) {
    return
  }

  const db: Db = client.db('replik')
  const bucket = new GridFSBucket(db)

  const downloadStream = bucket.openDownloadStreamByName(fileName)
  const fileStream = fs.createWriteStream(fileName)
  downloadStream.pipe(fileStream).on('finish', () => {
    console.log('File downloaded')
  })
}

downloadFile('test.txt')
