import * as express from 'express'
// Internal Dependencies
import * as usecaseLogic from '../logic/usecaseLogic'
import { usersRouter } from './usersApi'

// Router to be used in the index.ts (sent to firebase functions as api)
export let usecaseRouter = express.Router()

// usecaseRouter.post("/",usecaseLogic.createusecase);

// usecaseRouter.get("/template", usecaseLogic.getTemplate);
// usecaseRouter.get("/", usecaseLogic.getUseCase);
usecaseRouter.post('/', usecaseLogic.createUseCase)
usecaseRouter.delete('/', usecaseLogic.removeUseCase)

// Intercept un-matched routes,
usecaseRouter.get('*', async (req: express.Request, res: express.Response) => {
  res.status(404).send('This route does not exist.')
})
