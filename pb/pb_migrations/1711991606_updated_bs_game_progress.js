/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vzzjtkqs3u2crrh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l7una0ak",
    "name": "local_dict",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vzzjtkqs3u2crrh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l7una0ak",
    "name": "localDict",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
