# Epic Mail

Epic Mail is a web application that helps people exchange
messages/information over the internet.

[![Coverage Status](https://coveralls.io/repos/github/EmmanuelSage/EpicMail/badge.svg?branch=develop)](https://coveralls.io/github/EmmanuelSage/EpicMail?branch=develop)
[![Build Status](https://travis-ci.org/EmmanuelSage/EpicMail.svg?branch=develop)](https://travis-ci.org/EmmanuelSage/EpicMail)
![GitHub](https://img.shields.io/github/license/EmmanuelSage/EpicMail.svg)

## Built with
* Node Js
* Express
* Babel
* Eslint
* Mocha and Chai


## Requirements to run
To install this project you would need to have installed:
* Node js
* Git (vcs)

To run :
```node
$ git clone https://github.com/EmmanuelSage/EpicMail.git
$ cd EpicMail
$ npm install
$ npm start
```

To test :
```node
$ npm test
```

## Pivotal Tracker Stories
[https://www.pivotaltracker.com/n/projects/2315478](https://www.pivotaltracker.com/n/projects/2315478)


## Template for the ui is hosted at
[https://emmanuelsage.github.io/EpicMail/UI](https://emmanuelsage.github.io/EpicMail/UI)

## Api Documentation link
[https://esepicmail.herokuapp.com/api-docs](https://esepicmail.herokuapp.com/api-docs)

## Api Endpoints
| Endpoints                                        | Description                              |
| ------------------------------------------------ | -----------------------------------------|
| POST /auth/signup                                | Signs up a new user                      |
| POST /auth/login                                 | login a signed up user                   |
| POST /messages                                   | Sends/creates a new message              |
| GET /messages                                    | Fetch all received messages              |
| GET /messages/unread                             | Fetch all unread messages                |
| GET /messages/sent                               | Fetch all sent messages                  |
| GET /messages/{id}                               | Fetch a specific message                 |
| DELETE /messages/{id}                            | Delete a specific message                |
| POST /groups                                     | Create a Group                           |
| GET /groups                                      | Get all created groups                   |
| PATCH /groups/:id/name                           | Edit group name                          |
| DELETE /groups/:id                               | Delete a specific group                  |
| POST /groups/:groupid/users                      | Add a user to a group                    |
| DELETE /groups/:groupid/users/:userid            | Delete a user from a group               |
| POST /groups/:id/messages                        | Post a message to a group                |

## Author
Emmanuel Oluyale

## License
This is licensed for your use, modification and distribution under the MIT license.
