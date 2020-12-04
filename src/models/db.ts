import mongoose from "mongoose"
import dotenv from "dotenv"
import dbLogger from "../utils/db_logger"


interface ConnectionStatus {
    code: Number,
    message: String
}
let db: any = null
dotenv.config()

export async function connect() {
    const uri: string = process.env.MONGO_URL || ""
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('connected', function () {
    });
    let x: ConnectionStatus = { code: 200, message: "connection successful" };
    return x
}

export const getConnection = () => db