import { createWriteStream } from 'fs'
const cloudinary = require('cloudinary').v2
import * as shortid from 'shortid'
import path from 'path'
import config from 'config'
const makeDir = require('make-dir');

export const imgUploadMiddleware = async ({ createReadStream, filename }) => {
    console.log("imgUploadMiddleware -> { createReadStream, filename }", { createReadStream, filename })
    if (!createReadStream) {
        return null
    }
    await makeDir(`${__dirname}` + `/../../uploads`);

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
    const imgUrl = process.env.NODE_ENV == "development" ? 
    `${config.get('server.protocol')}://${config.get('server.host')}:${config.get('server.port')}/uploads/${id}-${filename}` :
    `${config.get('server.protocol')}://${config.get('server.host')}/uploads/${id}-${filename}`
    return imgUrl
}
