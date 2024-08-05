import * as dotenv from 'dotenv'
dotenv.config()

export default async function auth(req, res) {
  if (process.env.un === req.body.username && req.body.password === process.env.pw) {
    res.send('nice')
  } else {
    res.status(401).send('Password and Username do not match')
  }
}