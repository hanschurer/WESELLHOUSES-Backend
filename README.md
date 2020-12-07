# WeSellHouses Backend Code repo

#### Current Status

The repository is currently complete up to the end of the Week 11 worksheet tasks (tag:week11.2). Check out other git tags for known states (see section below).

| API Layer                                | In Active Development? |
|------------------------------------------|------------------------|
| Routing                                  | Yes                    |
| DB Integration                           | Yes    Use MongoDB     |
| Schema-Based Validation                  | Yes    Use JOI         |
| User Authentication                      | Yes    Use JWT         |
| User Permissions                         | Yes    role-acl        |
| HATEOAS Compliance                       | Yes                    |
| Search / Pagination / Partial Responses  | Yes                    |

| Code and Product Quality                 | In Active Development? |
|------------------------------------------|------------------------|
| OpenAPI Specification                    | Yes                    |
| Static code documentation (JSDoc)        | Yes                    |
| Test Suites                              | Yes                    |
| Code linting/formatting (ESLint)         | Yes                    |

## About

This one sells house site spa made for WeSellHouses IT team.


## Project Features
- [x] User registration function
- [x] User login function
- [x] Modify property information, upload video and other functions
- [x] Message sending and archiving functions
- [x] Search and filter properties by type and tags
- [x] regular commits over an extended period of time. Effective use of branching and merging.
- [x] including implementation of HATEOAS principles
- [x] The API provides feedback for invalid requests through appropriate response codes and messages
- [x] a flexible roles and permissions structure that allows an admin to manage permissions without changing code.

## Tech
Technology Stacks Used on the Back End: `Node、koa-router、role-acl、koa、JWT、eslint、joi、mongoose`

<br/>

## Project Deployment
npm install 

Use nodemon index.js to start the app

Use nodemon docs.js to start the open api. To see where the api document is, go to http://localhost:3333/openapi

## Test
![test](/static/Screen%20Shot%202020-12-07%20at%2009.36.01.png) 