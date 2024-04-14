/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vzzjtkqs3u2crrh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "znjcrd62",
    "name": "bs_game_set",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "art2fab3pwic9go",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vzzjtkqs3u2crrh")

  // remove
  collection.schema.removeField("znjcrd62")

  return dao.saveCollection(collection)
})
