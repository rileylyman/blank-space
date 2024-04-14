/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0n9kxrhwnd0wcn6")

  collection.options = {
    "query": "select (ROW_NUMBER() OVER()) as id, bgp.user, sum(bgp.score) as total_score, count(*) as games_played\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on \n  bgs.id = bs_game_set \n  and date(bgs.publish_on) > week0 \n  and date(bgs.publish_on) <= date(now)\njoin time_utils\nwhere bgp.user != \"\" and (bgp.won or bgp.lost)\ngroup by bgp.user"
  }

  // remove
  collection.schema.removeField("vyenuxve")

  // remove
  collection.schema.removeField("knitwnrq")

  // remove
  collection.schema.removeField("o3dxqdtt")

  // remove
  collection.schema.removeField("zejv5p0v")

  // remove
  collection.schema.removeField("afrgfi8w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fntfnqz9",
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
    "id": "q7sc4xxh",
    "name": "total_score",
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
    "id": "1dy63vja",
    "name": "games_played",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0n9kxrhwnd0wcn6")

  collection.options = {
    "query": "with valid_dates as (\n  select date(publish_on) as valid_date\n  from bs_game_sets\n  join time_utils\n  where valid_date >= week0 and valid_date <= date(now)\n),\ntotal_games as (\n  select COUNT(*) * 4 as tot\n  from valid_dates\n)\nselect (ROW_NUMBER() OVER()) as id, bgp.user, users.username, sum(bgp.score) as total_score, count(*) as games_played, total_games.tot as total_games\nfrom bs_game_progress bgp\njoin users on users.id = bgp.user\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin valid_dates on date(bgs.publish_on) = valid_date\njoin total_games\nwhere bgp.user != \"\" and (bgp.won or bgp.lost)\ngroup by bgp.user"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vyenuxve",
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
    "id": "knitwnrq",
    "name": "username",
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
    "id": "o3dxqdtt",
    "name": "total_score",
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
    "id": "zejv5p0v",
    "name": "games_played",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "afrgfi8w",
    "name": "total_games",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("fntfnqz9")

  // remove
  collection.schema.removeField("q7sc4xxh")

  // remove
  collection.schema.removeField("1dy63vja")

  return dao.saveCollection(collection)
})
