/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "with user_set as (\n  select\n    users.id as user,\n    bs_current_set.id as set_id,\n    json(bs_current_set.games) as games\n  from users\n  join bs_current_set\n)\nselect\n  (row_number() over ()) as id,\n  bgp.bs_game as prog_game,\n  user_set.user as user,\n  user_set.set_id as set_id,\n  user_set.games as set_games\nfrom bs_game_progress bgp\njoin user_set\n  on json_extract(user_set.games, '$') like '%' || bgp.bs_game || '%'\n  and user_set.user = bgp.user\n\n\n"
  }

  // remove
  collection.schema.removeField("1tn8osgv")

  // remove
  collection.schema.removeField("gnfovryr")

  // remove
  collection.schema.removeField("pii3aizf")

  // remove
  collection.schema.removeField("ndj1ygb6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ezvgyaao",
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
    "id": "gfojqw4g",
    "name": "user",
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
    "id": "onmnj3b5",
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
    "id": "rt6kcndp",
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
    "query": "with user_set as (\n  select\n    users.id as user,\n    bs_current_set.id as set_id,\n    json(bs_current_set.games) as games\n  from users\n  join bs_current_set\n)\nselect\n  (row_number() over ()) as id,\n  bgp.bs_game as prog_game,\n  user_set.user as user,\n  user_set.set_id as set_id,\n  user_set.games as set_games\nfrom bs_game_progress bgp\nright join user_set\n  on json_extract(user_set.games, '$') like '%' || bgp.bs_game || '%'\n  and user_set.user = bgp.user\n\n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1tn8osgv",
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
    "id": "gnfovryr",
    "name": "user",
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
    "id": "pii3aizf",
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
    "id": "ndj1ygb6",
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
  collection.schema.removeField("ezvgyaao")

  // remove
  collection.schema.removeField("gfojqw4g")

  // remove
  collection.schema.removeField("onmnj3b5")

  // remove
  collection.schema.removeField("rt6kcndp")

  return dao.saveCollection(collection)
})
