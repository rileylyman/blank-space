/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37hwzd34ul7612")

  collection.options = {
    "query": "with valid_dates as (\n  select date(publish_on) as valid_date\n  from bs_game_sets\n  join time_utils\n  where valid_date >= weekm7 and valid_date < week0\n),\ntotal_games as (\n  select COUNT(*) * 4 as tot\n  from valid_dates\n)\nselect (ROW_NUMBER() OVER()) as id, bgp.user, users.username, sum(bgp.score) as total_score, count(*) as games_played, total_games.tot as total_games\nfrom bs_game_progress bgp\njoin users on users.id = bgp.user\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin valid_dates on date(bgs.publish_on) = valid_date\njoin total_games\njoin time_utils\nwhere bgp.user != \"\" and date(bgp.created) < week0\ngroup by bgp.user"
  }

  // remove
  collection.schema.removeField("dt1onskf")

  // remove
  collection.schema.removeField("qakaaexs")

  // remove
  collection.schema.removeField("0q7jhjev")

  // remove
  collection.schema.removeField("tdufc39k")

  // remove
  collection.schema.removeField("7zpnyr2c")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1xyttwdc",
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
    "id": "s72vwhoo",
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
    "id": "vlhwvoed",
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
    "id": "pb4tm3ym",
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
    "id": "fsofhsfg",
    "name": "total_games",
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
  const collection = dao.findCollectionByNameOrId("m37hwzd34ul7612")

  collection.options = {
    "query": "with last_created as (\n  select date(julianday(datetime('now', '-7 hours')) \n                  - strftime('%w', datetime('now', '-7 hours')))\n         as last_created\n),\nvalid_dates as (\n  select publish_on as valid_date\n  from bs_game_sets\n  where date(publish_on) >= \n        date(julianday(datetime('now', '-7 hours')) \n                 - strftime('%w', datetime('now', '-7 hours')) - 7)\n    and date(publish_on) < date(julianday('now') - strftime('%w', 'now'))\n),\ntotal_games as (\n  select COUNT(*) * 4 as tot\n  from valid_dates\n)\nselect (ROW_NUMBER() OVER()) as id, bgp.user, users.username, sum(bgp.score) as total_score, count(*) as games_played, total_games.tot as total_games\nfrom bs_game_progress bgp\njoin users on users.id = bgp.user\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin valid_dates on bgs.publish_on = valid_date\njoin total_games\njoin last_created\nwhere bgp.user != \"\" and bgp.created < last_created\ngroup by bgp.user"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dt1onskf",
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
    "id": "qakaaexs",
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
    "id": "0q7jhjev",
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
    "id": "tdufc39k",
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
    "id": "7zpnyr2c",
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
  collection.schema.removeField("1xyttwdc")

  // remove
  collection.schema.removeField("s72vwhoo")

  // remove
  collection.schema.removeField("vlhwvoed")

  // remove
  collection.schema.removeField("pb4tm3ym")

  // remove
  collection.schema.removeField("fsofhsfg")

  return dao.saveCollection(collection)
})
