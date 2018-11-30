// External Dependencies
import * as express from 'express'
// Internal Dependencies
import * as usecaseStorage from '../storage/usecaseStorage'

export async function removeUseCase(
  req: express.Request,
  res: express.Response
) {
  // console.log(req.query.uuid)
  return usecaseStorage
    .deleteUseCase(req.body.puid, req.body.usecaseid)
    .then(() => res.status(200).send({ success: true }))
    .catch(err => {
      console.log(err)
      return res.status(500).send('Server Error')
    })
}

export async function createUseCase(
  req: express.Request,
  res: express.Response
) {
  // console.log(req.query.uuid)
  return usecaseStorage
    .addUseCase(req.body.puid, req.body.usecase)
    .then(() => res.status(200).send({ success: true }))
    .catch(err => {
      console.log(err)
      return res.status(500).send('Server Error')
    })
}
