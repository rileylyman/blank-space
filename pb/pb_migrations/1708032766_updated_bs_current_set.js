/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "with current_set as (\n  select\n    id,\n    games,\n    max(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on <= datetime('now')\n)\nselect\n  users.id as id,\n  current_set.id as set_id,\n  json(current_set.games) as games\nfrom users\njoin current_set\n\n"
  }

  // remove
  collection.schema.removeField("baxk5v0a")

  // remove
  collection.schema.removeField("e1p3cs59")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4oszfflm",
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
    "id": "rxm4bwtx",
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
    "query": "with current_set as (\n  select\n    id,\n    games,\n    max(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on <= datetime('now')\n)\nselect\n  users.id as id,\n  current_set.id as set_id,\n  json_object(current_set.games) as games\nfrom users\njoin current_set\n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "baxk5v0a",
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
    "id": "e1p3cs59",
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
  collection.schema.removeField("4oszfflm")

  // remove
  collection.schema.removeField("rxm4bwtx")

  return dao.saveCollection(collection)
})
