/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "with current_set as (\n  select\n    id,\n    games,\n    max(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on <= datetime('now')\n)\nselect\n  users.id as id,\n  current_set.id as set_id,\n  cast(current_set.games as json) as games\nfrom users\njoin current_set\n\n"
  }

  // remove
  collection.schema.removeField("qshfakpm")

  // remove
  collection.schema.removeField("zrh1ne5e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4edugfbp",
    "name": "set_id",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sqatlugd",
    "name": "games",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "with current_set as (\n  select\n    id,\n    games,\n    max(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on <= datetime('now')\n)\nselect\n  users.id as id,\n  current_set.id as set_id,\n  current_set.games as games\nfrom users\njoin current_set\n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qshfakpm",
    "name": "set_id",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zrh1ne5e",
    "name": "games",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("4edugfbp")

  // remove
  collection.schema.removeField("sqatlugd")

  return dao.saveCollection(collection)
})
