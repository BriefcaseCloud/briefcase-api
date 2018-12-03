// External Dependencies
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as express from 'express'
import * as bodyParser from 'body-parser'
admin.initializeApp(functions.config().firebase)

// Internal Dependencies
import { authRouter } from './api/authApi'
import { usersRouter } from './api/usersApi'
import { projectsRouter } from './api/projectsApi'
// import { updateUserProjects} from "./storage/usersStorage"
import { updateFunction } from './dbListener/projectsListener'

const app = express()

// https://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/auth', authRouter)
app.use('/users', usersRouter)

app.use('/projects', projectsRouter)

// Any unmatched base route will result in 404
app.get('*', async (req: express.Request, res: express.Response) => {
  res.status(404).send('This route does not exist.')
})

export default app

exports.api = functions.https.onRequest(app)

exports.updateUser = updateFunction
