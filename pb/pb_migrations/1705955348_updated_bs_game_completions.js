/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vzzjtkqs3u2crrh")

  collection.name = "bs_game_progress"

  // remove
  collection.schema.removeField("tb5zsq4u")

  // remove
  collection.schema.removeField("rs3gph3j")

  // remove
  collection.schema.removeField("qsv96au9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r7jklrr4",
    "name": "guesses",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vzzjtkqs3u2crrh")

  collection.name = "bs_game_completions"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tb5zsq4u",
    "name": "elapsed_ms",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rs3gph3j",
    "name": "guess_index",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qsv96au9",
    "name": "failed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("r7jklrr4")

  return dao.saveCollection(collection)
})
