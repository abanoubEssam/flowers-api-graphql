import { createWriteStream } from 'fs'
import * as shortid from 'shortid'
import path from 'path'
import config from 'config'
export const imgUploadMiddleware = async ({ createReadStream, filename }) => {
    if (!createReadStream) {
        return null
    }
    const id = shortid.generate()
    const pathDir = `${__dirname}` + `/../../uploads/${id}-${filename}`
    const newPath = path.resolve(pathDir)
    console.log("imgUploadMiddleware -> newPath", newPath)
    await new Promise((resolve, reject) =>
    createReadStream()
            .pipe(createWriteStream(pathDir))
            .on('finish', () => resolve({ id, path: pathDir }))
            .on('error', reject),
    )
    return `${config.get('server.protocol')}://${config.get('server.host')}:${config.get('server.port')}/uploads/${id}-${filename}`
}
