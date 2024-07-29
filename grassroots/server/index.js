import express from 'express'
import path from 'path'
import goofballStream from './routes.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import * as dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = process.env.port || 4000

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/stream', goofballStream)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})