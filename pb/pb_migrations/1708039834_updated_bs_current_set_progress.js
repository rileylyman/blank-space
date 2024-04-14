/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "select\n  bgp.id as id,\n  bgp.user,\n  bgp.bs_game,\n  bgp.guesses,\n  bgp.won,\n  bgp.lost\nfrom bs_game_progress bgp\njoin bs_current_set bcs\n  on json_extract(bcs.games, '$') like '%' || bgp.bs_game || '%'\n\n"
  }

  // remove
  collection.schema.removeField("ryyetkza")

  // remove
  collection.schema.removeField("xply3xmu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jdayyaew",
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
    "id": "0gfknjtt",
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
    "id": "yyyice7j",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "arvfbbls",
    "name": "won",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ljxqzuif",
    "name": "lost",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "with user_set as (\n  select\n    users.id as user,\n    bs_current_set.id as set_id,\n    json(bs_current_set.games) as games\n  from users\n  join bs_current_set\n)\nselect\n  (row_number() over ()) as id,\n  bgp.bs_game as prog_game,\n  user_set.user as user\nfrom bs_game_progress bgp\njoin user_set\n  on json_extract(user_set.games, '$') like '%' || bgp.bs_game || '%'\n  and user_set.user = bgp.user\n\n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ryyetkza",
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
    "id": "xply3xmu",
    "name": "user",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("jdayyaew")

  // remove
  collection.schema.removeField("0gfknjtt")

  // remove
  collection.schema.removeField("yyyice7j")

  // remove
  collection.schema.removeField("arvfbbls")

  // remove
  collection.schema.removeField("ljxqzuif")

  return dao.saveCollection(collection)
})
