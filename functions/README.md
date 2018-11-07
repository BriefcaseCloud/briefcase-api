# Briefcase Functions  

The functions folder here is to hold logic pertaining to the Briefcase app. 
All written source code is contained under [src](./src), while other build 
output, dependency management, and configuration is done here in the root 
[functions](.) folder. 
Inside [src](./src), the top-level [index.js](./src/index.js) is what is run 
by Google Firebase Functions when the code is deployed. 
In it, should contain and import/export all functionality required for the 
Briefcase backend. 

## Folder Structure  

The folder structure is intended to make the project more easy to navigate and 
understand. 
The following sections describe each directory and it's purpose: 

### api

The [api](./src/api) directory contains all that is pertinent to hosting the 
Briefcase api. 
The [index.ts](./src/api/index.ts) in [api](./src/api) is what starts the 
express app, and pulls in and applies the rest of the api routers to the app.  

Each other file or folder in this directory is responsible for managing the 
endpoint as indicated in it's name.

### modules

The [modules](./src/modules) directory is intended to offer developers tools 
when working with other functions. 
No module should be directly imported by the 
[functions index.ts](./src/index.ts) as they are not meant to be stand-alone 
functions. 
