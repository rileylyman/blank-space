/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("799dtk8s0tjd89z")

  collection.options = {
    "query": "SELECT bs_games.id, target, hint1, hint2, hint3, hint4, pity_hint, notes\nFROM bs_games\nLEFT JOIN bs_game_sets\nON json_extract(games, '$') like '%' || bs_games.id || '%'\nWHERE games IS NULL;\n"
  }

  // remove
  collection.schema.removeField("8mwgowkj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aepgwz0x",
    "name": "target",
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
    "id": "qlyjqmhs",
    "name": "hint1",
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
    "id": "qmew3eh3",
    "name": "hint2",
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
    "id": "cr3x0v9z",
    "name": "hint3",
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
    "id": "cxfxh4cn",
    "name": "hint4",
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
    "id": "gtzlcgvo",
    "name": "pity_hint",
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
    "id": "anqrjtj7",
    "name": "notes",
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
  const collection = dao.findCollectionByNameOrId("799dtk8s0tjd89z")

  collection.options = {
    "query": "select id, games[0] from bs_game_sets"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8mwgowkj",
    "name": "0",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("aepgwz0x")

  // remove
  collection.schema.removeField("qlyjqmhs")

  // remove
  collection.schema.removeField("qmew3eh3")

  // remove
  collection.schema.removeField("cr3x0v9z")

  // remove
  collection.schema.removeField("cxfxh4cn")

  // remove
  collection.schema.removeField("gtzlcgvo")

  // remove
  collection.schema.removeField("anqrjtj7")

  return dao.saveCollection(collection)
})
