// External Dependencies
import * as express from 'express'
// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as functions from 'firebase-functions'
import * as usersStorage from '../storage/usersStorage'

export const updateFunction = functions.firestore
  .document('/projects/{projectid}')
  .onWrite(async (change, context) => {
    let userChange = {}
    const newUsers = change.after.exists ? change.after.data().users : false
    const oldUsers = change.before.exists ? change.before.data().users : false
    if (!newUsers) {
    //   console.log('welp, we arnt there yet')
      for(let users in oldUsers){
        userChange = { id: oldUsers[users].user, project: context.params.projectid }
        const removeUser = await usersStorage.removeUserProjects(userChange)
      }
    //   return change.before
      
    } else if (!oldUsers) {
      const newestUser = newUsers[newUsers.length - 1].user
      userChange = { id: newestUser, project: context.params.projectid }
      const updatedUser = await usersStorage.updateUserProjects(userChange)
    //   return updatedUser
    } else if (newUsers.length !== oldUsers.length) {
      const newestUser = newUsers[newUsers.length - 1].user
      userChange = { id: newestUser, project: context.params.projectid }
      const updatedUser = await usersStorage.updateUserProjects(userChange)
    //   return updatedUser
    }
    // return change.after
  })
