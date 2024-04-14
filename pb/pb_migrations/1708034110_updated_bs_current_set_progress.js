/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "with user_set as (\n  select\n    users.id as user,\n    bs_current_set.id as set_id,\n    json(bs_current_set.games) as games\n  from users\n  join bs_current_set\n)\nselect\n  (row_number() over ()) as id,\n  bgp.bs_game as prog_game,\n  user_set.user as user,\n  user_set.set_id as set_id,\n  user_set.games as set_games\nfrom bs_game_progress bgp\nright join user_set\n  on json_extract(user_set.games, '$') like '%' || bgp.bs_game || '%'\n  and user_set.user = bgp.user\n\n\n"
  }

  // remove
  collection.schema.removeField("dvh0ifla")

  // remove
  collection.schema.removeField("6md48xhg")

  // remove
  collection.schema.removeField("ras0sufu")

  // remove
  collection.schema.removeField("xisvp0ab")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "with current_set as (\n  select\n    id,\n    games,\n    max(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on <= datetime('now')\n),\nuser_set as (\n  select\n    users.id as id,\n    current_set.id as set_id,\n    json(current_set.games) as games\n  from users\n  join current_set\n)\nselect\n  (row_number() over ()) as id,\n  bgp.bs_game as prog_game,\n  user_set.id as user_id,\n  user_set.set_id as set_id,\n  user_set.games as set_games\nfrom bs_game_progress bgp\nright join user_set\n  on json_extract(user_set.games, '$') like '%' || bgp.bs_game || '%'\n  and user_set.id = bgp.user\n\n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dvh0ifla",
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
    "id": "6md48xhg",
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
    "id": "ras0sufu",
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
    "id": "xisvp0ab",
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
  collection.schema.removeField("1tn8osgv")

  // remove
  collection.schema.removeField("gnfovryr")

  // remove
  collection.schema.removeField("pii3aizf")

  // remove
  collection.schema.removeField("ndj1ygb6")

  return dao.saveCollection(collection)
})
