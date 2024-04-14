/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("799dtk8s0tjd89z")

  collection.options = {
    "query": "SELECT bs_games.id, name, target, hint1, hint2, hint3, hint4, pity_hint, notes\nFROM bs_games\nLEFT JOIN bs_game_sets\nON json_extract(games, '$') like '%' || bs_games.id || '%'\nWHERE games IS NULL;\n"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "va3j3mi3",
    "name": "name",
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
    "id": "2ucl3uyn",
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
    "id": "xrm3xi0o",
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
    "id": "q9pph1yh",
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
    "id": "8mtjykyr",
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
    "id": "stmxtjqq",
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
    "id": "yth78q1l",
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
    "id": "sdh3hzh3",
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
    "query": "SELECT bs_games.id, target, hint1, hint2, hint3, hint4, pity_hint, notes\nFROM bs_games\nLEFT JOIN bs_game_sets\nON json_extract(games, '$') like '%' || bs_games.id || '%'\nWHERE games IS NULL;\n"
  }

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

  // remove
  collection.schema.removeField("va3j3mi3")

  // remove
  collection.schema.removeField("2ucl3uyn")

  // remove
  collection.schema.removeField("xrm3xi0o")

  // remove
  collection.schema.removeField("q9pph1yh")

  // remove
  collection.schema.removeField("8mtjykyr")

  // remove
  collection.schema.removeField("stmxtjqq")

  // remove
  collection.schema.removeField("yth78q1l")

  // remove
  collection.schema.removeField("sdh3hzh3")

  return dao.saveCollection(collection)
})
