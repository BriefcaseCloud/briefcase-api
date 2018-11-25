// External Dependencies
import * as express from "express";
// Internal Dependencies
import * as projectsStorage from "../storage/projectsStorage";

/*********************
 **      Logic      **
 *********************/


export async function createProjects(
    req: express.Request,
    res: express.Response
) {
    return projectsStorage
        .createProject(req.body.project)
        .then(() => res.status(200).send({success: true}))
        .catch(err => {
            console.log(err);
            return res.status(500).send("Server Error");
        });
}

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

export async function getTemplate(
    req: express.Request,
    res: express.Response
) {
    return projectsStorage
        .getTemplate()
        .then(template => res.status(200).send({ template }))
        .catch(err => {
            console.log(err);
            return res.status(500).send("Server Error");
        });
}
