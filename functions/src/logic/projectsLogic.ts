// External Dependencies
import * as express from "express";
// Internal Dependencies
import * as projectsStorage from "../storage/projectsStorage";

/*********************
 **      Logic      **
 *********************/

export async function getProjects(
    req: express.Request,
    res: express.Response
) {
    return projectsStorage
        .getProjects(req.body.uuid)
        .then(projects => res.status(200).send({ projects }))
        .catch(err => {
            console.log(err);
            return res.status(500).send("Server Error");
        });
}