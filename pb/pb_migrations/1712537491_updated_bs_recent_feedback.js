/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jh9al3f5krmqrsy")

  collection.options = {
    "query": "select fb.id, fb.bs_game, fb.user, feedback, tags, thumbs, prog, fb.created, fb.updated\nfrom bs_game_feedback as fb\njoin time_utils\njoin bs_game_progress on fb.prog = bs_game_progress.id\njoin bs_game_sets on bs_game_set = bs_game_sets.id\nwhere date(publish_on) = date(now)\n  or date(publish_on) = date(now, '-1 day')\norder by fb.created desc"
  }

  // remove
  collection.schema.removeField("z1e1qsko")

  // remove
  collection.schema.removeField("b6um0pbr")

  // remove
  collection.schema.removeField("wmsbhsct")

  // remove
  collection.schema.removeField("wd6dngxj")

  // remove
  collection.schema.removeField("t0o6dmfb")

  // remove
  collection.schema.removeField("kis5no4q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qkqlzeti",
    "name": "bs_game",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tarz1503wkeorcs",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t3dhirdc",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "guu4eonp",
    "name": "feedback",
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
    "id": "lvuqzjjl",
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
    "id": "urhw0mil",
    "name": "thumbs",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i99lzkfx",
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
  const collection = dao.findCollectionByNameOrId("jh9al3f5krmqrsy")

  collection.options = {
    "query": "select fb.id, fb.bs_game, fb.user, feedback, tags, thumbs, prog, fb.created, fb.updated\nfrom bs_game_feedback as fb\njoin time_utils\njoin bs_game_progress on fb.prog = bs_game_progress.id\njoin bs_game_sets on bs_game_set = bs_game_sets.id\nwhere date(publish_on) = date(now)\n  or date(publish_on) = date(now, '-1 day')"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z1e1qsko",
    "name": "bs_game",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tarz1503wkeorcs",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b6um0pbr",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wmsbhsct",
    "name": "feedback",
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
    "id": "wd6dngxj",
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
    "id": "t0o6dmfb",
    "name": "thumbs",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kis5no4q",
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

  // remove
  collection.schema.removeField("qkqlzeti")

  // remove
  collection.schema.removeField("t3dhirdc")

  // remove
  collection.schema.removeField("guu4eonp")

  // remove
  collection.schema.removeField("lvuqzjjl")

  // remove
  collection.schema.removeField("urhw0mil")

  // remove
  collection.schema.removeField("i99lzkfx")

  return dao.saveCollection(collection)
})
