/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2x3qzu8iqjens5m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fttcel4o",
    "name": "prog",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vzzjtkqs3u2crrh",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2x3qzu8iqjens5m")

  // remove
  collection.schema.removeField("fttcel4o")

  return dao.saveCollection(collection)
})
