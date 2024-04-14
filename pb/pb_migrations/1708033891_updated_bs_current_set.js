/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "with current_set as (\n  select\n    id,\n    games,\n    max(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on <= datetime('now')\n),\nuser_set as (\n  select\n    users.id as id,\n    current_set.id as set_id,\n    json(current_set.games) as games\n  from users\n  join current_set\n)\nselect\n  (row_number() over ()) as id,\n  bgp.bs_game as prog_game,\n  user_set.id as user_id,\n  user_set.set_id as set_id,\n  user_set.games as set_games\nfrom bs_game_progress bgp\nright join user_set\n  on json_extract(user_set.games, '$') like '%' || bgp.bs_game || '%'\n  and user_set.id = bgp.user\n\n\n"
  }

  // remove
  collection.schema.removeField("oc64qhv0")

  // remove
  collection.schema.removeField("hw0e9tpg")

  // remove
  collection.schema.removeField("mlaynite")

  // remove
  collection.schema.removeField("tjfotibb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ox9lcilo",
    "name": "prog_game",
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
    "id": "acdc1ino",
    "name": "user_id",
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
    "id": "2n4bz3wn",
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
    "id": "qiz9ubla",
    "name": "set_games",
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
    "query": "with current_set as (\n  select\n    id,\n    games,\n    max(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on <= datetime('now')\n),\nuser_set as (\n  select\n    users.id as id,\n    current_set.id as set_id,\n    json(current_set.games) as games\n  from users\n  join current_set\n)\nselect\n  (row_number() over ()) as id,\n  bgp.bs_game as prog_game,\n  bgp.user as user_id,\n  user_set.set_id as set_id,\n  user_set.games as set_games\nfrom bs_game_progress bgp\nright join user_set\n  on json_extract(user_set.games, '$') like '%' || bgp.bs_game || '%'\n  and user_set.id = bgp.user\n\n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oc64qhv0",
    "name": "prog_game",
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
    "id": "hw0e9tpg",
    "name": "user_id",
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
    "id": "mlaynite",
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
    "id": "tjfotibb",
    "name": "set_games",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("ox9lcilo")

  // remove
  collection.schema.removeField("acdc1ino")

  // remove
  collection.schema.removeField("2n4bz3wn")

  // remove
  collection.schema.removeField("qiz9ubla")

  return dao.saveCollection(collection)
})
