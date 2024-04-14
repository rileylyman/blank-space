/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "with current_set as (\n  select\n    id,\n    games,\n    max(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on <= datetime('now')\n),\nuser_set as (\n  select\n    users.id as id,\n    current_set.id as set_id,\n    json(current_set.games) as games\n  from users\n  join current_set\n)\nselect\n  user_set.id as id,\n  user_set.set_id as set_id,\n  user_set.games as games,\n  bgp.bs_game\nfrom bs_game_progress bgp\njoin user_set\n  on json_extract(user_set.games, '$') like '%' || bgp.bs_game || '%'\n\n"
  }

  // remove
  collection.schema.removeField("lgbz9ppw")

  // remove
  collection.schema.removeField("pcso0oex")

  // remove
  collection.schema.removeField("o79pqesb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vasfwbc0",
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
    "id": "aftjqfy3",
    "name": "games",
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
    "id": "f1e8tcyf",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "with current_set as (\n  select\n    id,\n    games,\n    max(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on <= datetime('now')\n),\nuser_set as (\n  select\n    users.id as id,\n    current_set.id as set_id,\n    json(current_set.games) as games\n  from users\n  join current_set\n)\nselect\n  user_set.id as id,\n  user_set.set_id as set_id,\n  user_set.games as games,\n  bgp.bs_game\nfrom user_set\njoin bs_game_progress bgp \n  on json_extract(user_set.games, '$') like '%' || bgp.bs_game || '%'\n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lgbz9ppw",
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
    "id": "pcso0oex",
    "name": "games",
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
    "id": "o79pqesb",
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

  // remove
  collection.schema.removeField("vasfwbc0")

  // remove
  collection.schema.removeField("aftjqfy3")

  // remove
  collection.schema.removeField("f1e8tcyf")

  return dao.saveCollection(collection)
})
