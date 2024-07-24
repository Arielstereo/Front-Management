import {connect} from 'mongoose'

async function dbConnection() {
  try {
    await connect(process.env.MONGODB_URI)
    console.log("MongoDb is connected!");
    
  } catch (error) {
    throw new Error(`Connection error: ${error} `)
  }
}

export default dbConnection