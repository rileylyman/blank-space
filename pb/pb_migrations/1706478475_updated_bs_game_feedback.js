/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2x3qzu8iqjens5m")

  // remove
  collection.schema.removeField("zptwdds1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f6ugeltt",
    "name": "tags",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p9g4u5zf",
    "name": "thumbs",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2x3qzu8iqjens5m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zptwdds1",
    "name": "rating",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("f6ugeltt")

  // remove
  collection.schema.removeField("p9g4u5zf")

  return dao.saveCollection(collection)
})
