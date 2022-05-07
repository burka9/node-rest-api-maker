import path from 'path'
import { json, urlencoded, static as st } from 'express'
import cors from 'cors'
import routes from '../routes'

export default app => {
	app.use(cors())
	app.use(urlencoded({ extended: false }))
	app.use(json())

	app.use(st(path.resolve('public')))

	app.use(routes)
}