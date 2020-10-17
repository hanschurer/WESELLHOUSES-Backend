module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/user",
    "title": "User",
    "description": "A registered user of the wesellhouses",
    "type": "object",
    "properties": {
      "firstname": {
        "description": "First name",
        "type": "string"
      },
      "lastname": {
        "description": "Last name",
        "type": "string"
      },
      "username": {
        "description": "Unique username",
        "type": "string"
      },
      "password": {
        "description": "Password for registration",
        "type": "string"
      },
      "email": {
        "description": "Unique email address",
        "type": "email"
      },
      "avatarURL": {
        "description": "URL of avatar image",
        "type": "uri"
      },
    },
    "required": ["username", "email", "password"],
    "additionalProperties": false
  }