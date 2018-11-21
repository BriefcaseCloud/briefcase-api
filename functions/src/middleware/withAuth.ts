// External Dependencies
import * as express from "express";
// Internal Dependencies
import * as authStorage from "../storage/authStorage";

/**
 * Add uuid to 
 * @param req 
 * @param res 
 * @param next 
 */
export default async function withAuthMiddleware(req, res, next) {
    if (res.body.token === undefined) {
        console.error("No token passed to route requiring auth")
        throw "No token passed to route requiring auth"
    }
    const uuid = await authStorage.lookupUuid(res.body.token)
    req.body.uuid = uuid
    next()
}
