# Briefcase Backend

Briefcase is an application created as the term project for the UVic SENG 350 
(Software Architecture) course. 

It is accessible at [http://briefcase.cloud](http://briefcase.cloud). 

## Technologies  

The backend is supported by two products from Google's Firebase platform.  
And written in [Typescript](https://www.typescriptlang.org/), with routing 
help from [Express](https://expressjs.com/), all on top of 
[Node](https://nodejs.org/).

### Firestore  

Firestore is a no-sql-like database solution. It iterates on their previous 
product, "Realtime Database", by adding features such as nested collections. 
In some ways, if you squint and look from a distance, Firestore could be 
regarded as similar to MongoDB (which is the "required" db for this course).  

As this is a no-sql db, there is not hard and fast schemas. However, you can 
find the [Briefcase Firestore schema guideline here](./firestore/README.md). 

Along with the above, the Briefcase Firestore rules and indexes configuration 
can also be found in the [firestore folder](./firestore).

### Firebase Functions

Firebase Functions are a product from google which resemble AWS Lambda. 
It allows developers to write code which will only be called upon some 
particular trigger, without the use of a watch server.
This means, developers need not worry about linux server configuration and 
maintenance. 

All of Briefcase's backend logic is held in Firebase Functions. 
Briefcase uses http triggers to allow functions to act as the api server. 
Furthermore, express is used under the hood for the api Function to provide 
RESTful endpoints and adhere to industry conventions. 
This can be seen by looking in the [src](./src) directory and observing how 
each router in the [api](./src/api) directory are imported and applied to the 
express app.


