module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/Item",
    "title": "Item",
    "description": "An item in the wesellhouses",
    "type": "object",
    "properties": {
      "property_name": {
        "description": "Main name of the property",
        "type": "string"
      },
      "keywords": {
        "description": "Some keywords for the property",
        "type": "string"
      },
      "description": {
        "description": "Some thing describe the property",
        "type": "string"
      },
      "location": {
        "description": "Where is the property",
        "type": "string"
      },
      "category": {
        "description": "what kind is the property",
        "type": "string"
      },
      "imageURL": {
        "description": "URL for main image to show in property",
        "type": "string",
        "format": "uri"
      },
      "offer": {
        "description": "Is the property offered or not",
        "type": "boolean"
      },
      "Hidden": {
        "description": "Is the property hidden or not",
        "type": "boolean"
      },
      "price": {
        "description": "The price of the property",
        "type": "integer",
        "minimum": 0
      },
    },
    "required": ["property_name", "price"],
    "additionalProperties": false
  }