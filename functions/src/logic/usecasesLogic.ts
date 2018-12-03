// External Dependencies
import * as express from 'express'
// Internal Dependencies
import * as usecasesStorage from '../storage/usecasesStorage'


/**
 * Create use case with ucid under project puid
 * @param req - express request object
 * @param req.params - request url query params
 * @param req.params.puid - project id of project containing usecase
 * @param res - express response object
 */
export async function addUsecase(
  req: express.Request,
  res: express.Response
) {
  // console.log(req.query.uuid)
  return usecasesStorage
    .addUsecase(req.params.puid)
    .then((ref) => ref.get().then(doc => doc.data()))
    .then((data) => res.status(200).send({ ...data }))
    .catch(err => {
      console.error(err)
      return res.status(500).send('Server Error')
    })
}

/**
 * Save use case with ucid under project puid
 * @param req - express request object
 * @param req.params - url params
 * @param req.params.puid - project id of project containing usecase
 * @param req.params.ucid - project id of project containing usecase
 * @param req.body - request body
 * @param req.body.usecase - project id of project containing usecase
 * @param res - express response object
 */
export function saveUsecase(
  req: express.Request,
  res: express.Response
) {
  // console.log(req.query.uuid)
  return usecasesStorage
    .updateUsecase(req.params.puid, req.params.ucid, req.body.usecase)
    .then(() => res.status(200).send())
    .catch(err => {
      console.error(err)
      return res.status(500).send('Server Error')
    })
}

/**
 * Delete use case with ucid
 * @param req - express request object
 * @param req.params - request url query params
 * @param req.params.puid - project id of project containing usecase
 * @param req.params.ucid - usecase id to delete
 * @param res - express response object
 */
export function deleteUsecase(
  req: express.Request,
  res: express.Response
) {
  return usecasesStorage
    .deleteUsecase(req.body.puid, req.body.ucid)
    .then(() => res.status(200).send())
    .catch(err => {
      console.error(err)
      return res.status(500).send('Server Error')
    })
}
