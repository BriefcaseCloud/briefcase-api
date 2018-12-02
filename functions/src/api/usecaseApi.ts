import * as express from 'express'
// Internal Dependencies
import * as usecaseLogic from '../logic/usecaseLogic'

// Router to be used in the index.ts (sent to firebase functions as api)
export let usecaseRouter = express.Router()

usecaseRouter.post('/', usecaseLogic.addUseCase)
usecaseRouter.delete('/', usecaseLogic.deleteUseCase)

usecaseRouter.get('*', async (req: express.Request, res: express.Response) => {
  res.status(404).send('This route does not exist.')
})
