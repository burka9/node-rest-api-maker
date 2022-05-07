import mongoose from 'mongoose'
import models from './models'

const DEFAULT_CALLBACK = err => {
	if (err) return process.stdout.write(`Failed to connect to database\n`)

	mongoose.models = models
	
	process.stdout.write(`Connected to ${process.env.DATABASE_NAME}\n`)
}


export function connect(uri = process.env.OFFLINE_DATABASE_URI, callback = DEFAULT_CALLBACK) {
	mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, callback)
}