import http from 'http'
import express from 'express'
import middleware from './middleware'
import { connect } from './database'

const DEFAULT_CALLBACK = (port, db_origin) => {
	process.stdout.write(`Server listening on port ${port}\n`)
	process.stdout.write(`Database origin: ${db_origin}\n`)
	connect(db_origin == 'cloud' ? process.env.ONLINE_DATABASE_URI : process.env.OFFLINE_DATABASE_URI)
}


let app = express()
middleware(app)


let server = http.createServer(app)


export function start(port = process.env.PORT || 3000, db_origin, callback = DEFAULT_CALLBACK) {
	server.listen(process.env.PORT || port, callback(port, db_origin))
}