// External Dependencies
import * as express from 'express'
// Internal Dependencies
import * as authStorage from '../storage/authStorage'

/**
 * Add uuid to
 * @param req
 * @param res
 * @param next
 */
export default async function withProjectExistsMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.body === undefined || req.body.token === undefined) {
    console.error('No token passed to route requiring auth')
    return res.status(400).send('No token passed')
  }
  const uuid = await authStorage.lookupUuid(req.body.token)
  if ((await authStorage.isTokenValid(req.body.token, uuid)) === false)
    return res.status(401).send('Token is not valid')
  req.body.uuid = uuid
  next()
  return undefined
}
