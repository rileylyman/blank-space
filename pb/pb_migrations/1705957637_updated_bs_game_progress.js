/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vzzjtkqs3u2crrh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dugqeli6",
    "name": "won",
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

  // remove
  collection.schema.removeField("dugqeli6")

  return dao.saveCollection(collection)
})
