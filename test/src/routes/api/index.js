import { Router } from 'express'
import path from 'path'

const router = Router()


router.get('/', (req, res) => res.download(path.resolve('src/routes/api/DOCUMENTATION.md')))


export default router