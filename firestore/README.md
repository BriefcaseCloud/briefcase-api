# Briefcase Firestore

## Schema Guide

Multiple collections and sub-collections exist in the Briefcase database. 
Each top level collection is denoted in the following with a level 3 header, 
while subsequent nested collections are included under each section with a 
section header of one less (i.e. collections has header 3, and sub-collection 
has header 4).

### Auth

The auth collection details users ids, tokens, and when they were last used. 
The database follows this following schema:  

```json
{
    "<user_id: string>": {
        "token": "<token: string>",
        "created": "<time_since_utc: int>"
    }
}
```

Where the `<user_id>` object can be repeated |`users`| number of times. 
No user should have two entries. 
If a token expires, the next time that user attempts to access the application, 
a new request should be made to create a new token, thereby setting a new token 
and creation time.
