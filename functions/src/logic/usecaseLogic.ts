// External Dependencies
import * as express from 'express'
// Internal Dependencies
import * as usecaseStorage from '../storage/usecaseStorage'


/**
 * Create use case with ucid
 * @param req - express request object
 * @param req.body - request url query params
 * @param req.body.puid - project id of project containing usecase
 * @param req.body.usecase - usecase body
 * @param res - express response object
 */
export async function addUseCase(
  req: express.Request,
  res: express.Response
) {
  // console.log(req.query.uuid)
  return usecaseStorage
    .addUseCase(req.body.puid, req.body.usecase)
    .then(() => res.status(200).send())
    .catch(err => {
      console.error(err)
      return res.status(500).send('Server Error')
    })
}

/**
 * Delete use case with ucid
 * @param req - express request object
 * @param req.body - request url query params
 * @param req.body.puid - project id of project containing usecase
 * @param req.body.usecaseid - usecase id to delete
 * @param res - express response object
 */
export async function deleteUseCase(
  req: express.Request,
  res: express.Response
) {
  // console.log(req.query.uuid)
  return usecaseStorage
    .deleteUseCase(req.body.puid, req.body.usecaseid)
    .then(() => res.status(200).send())
    .catch(err => {
      console.error(err)
      return res.status(500).send('Server Error')
    })
}
