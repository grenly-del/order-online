// Get the client
import mongoose, { ConnectOptions } from 'mongoose';
import { DB } from '../config';

const port = DB.DB_PORT
const host = DB.DB_HOST
const name = DB.DB_NAME
const pass = DB.DB_PASS
const user = DB.DB_USER


const url = `mongodb://${user}:${pass}@${host}:${port}/${name}?directConnection=true&serverSelectionTimeoutMS=2000&authSource=admin&appName=mongosh+2.2.6`


const connectDB =  async () => {
  try{
      await mongoose.connect(url)
      console.log(`database connected to port ${port}`)
  }catch(err) {
    console.log(err)
  }
}

export {connectDB}