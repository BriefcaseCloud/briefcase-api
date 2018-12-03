import * as express from 'express'
// Internal Dependencies
import * as usecasesLogic from '../logic/usecasesLogic'

// Router to be used in the index.ts (sent to firebase functions as api)
export let usecasesRouter = express.Router()

usecasesRouter.post('/', usecasesLogic.addUsecase)
usecasesRouter.put('/:ucid', usecasesLogic.saveUsecase)
usecasesRouter.delete('/:ucid', usecasesLogic.deleteUsecase)

usecasesRouter.get('*', async (req: express.Request, res: express.Response) => {
  res.status(404).send('This route does not exist.')
})
