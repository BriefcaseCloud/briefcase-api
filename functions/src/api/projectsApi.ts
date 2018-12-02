// External Dependencies
import * as express from 'express'
// Internal Dependencies
import * as projectsLogic from '../logic/projectsLogic'
import { usersRouter } from './usersApi'

// Router to be used in the index.ts (sent to firebase functions as api)
export let projectsRouter = express.Router()

/*********************
 **       API       **
 *********************/

projectsRouter.post('/', projectsLogic.createProjects)// body: {projects: (projectObject)}
projectsRouter.post('/share', projectsLogic.shareProjects)//body: {id: (id of project), users: [{user: (id of user), permissions: (user permissions)}]}
projectsRouter.get('/template', projectsLogic.getTemplate)
projectsRouter.get('/', projectsLogic.getProjects)
projectsRouter.put('/:puid', projectsLogic.saveProjects)
projectsRouter.delete('/:puid', projectsLogic.removeProjects)

// Intercept un-matched routes,
projectsRouter.get('*', async (req: express.Request, res: express.Response) => {
  res.status(404).send('This route does not exist.')
})
