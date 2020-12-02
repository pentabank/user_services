import morgan from "morgan"
import fs from "fs"
import path from "path"

let dbLogger = morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'db.log'), { flags: 'a' })
})

export default dbLogger

