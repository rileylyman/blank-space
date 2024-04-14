/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37hwzd34ul7612")

  collection.options = {
    "query": "with valid_dates as (\n  select publish_on as valid_date\n  from bs_game_sets\n  where date(publish_on) >= \n        date(julianday('now') - strftime('%w', datetime('now', '-7 hours')) - 7)\n    and date(publish_on) < date(julianday('now') - strftime('%w', 'now'))\n),\ntotal_games as (\n  select COUNT(*) * 4 as tot\n  from valid_dates\n)\nselect (ROW_NUMBER() OVER()) as id, bgp.user, users.username, sum(bgp.score) as total_score, count(*) as games_played, total_games.tot as total_games\nfrom bs_game_progress bgp\njoin users on users.id = bgp.user\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin valid_dates on bgs.publish_on = valid_date\njoin total_games\nwhere bgp.user != \"\"\ngroup by bgp.user"
  }

  // remove
  collection.schema.removeField("u8mcqogc")

  // remove
  collection.schema.removeField("mhowj8kg")

  // remove
  collection.schema.removeField("icmfmw5p")

  // remove
  collection.schema.removeField("pqeio2bo")

  // remove
  collection.schema.removeField("wzhsysqc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "utdimo0l",
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
    "id": "3tshr5yb",
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
    "id": "y89xtmpr",
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
    "id": "hq3mjzq2",
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
    "id": "seehqwvm",
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
    "query": "with valid_dates as (\n  select publish_on as valid_date\n  from bs_game_sets\n  where date(publish_on) >= date(julianday('now') - (strftime('%w', 'now') + 7))\n    and date(publish_on) < date(julianday('now') - strftime('%w', 'now'))\n),\ntotal_games as (\n  select COUNT(*) * 4 as tot\n  from valid_dates\n)\nselect (ROW_NUMBER() OVER()) as id, bgp.user, users.username, sum(bgp.score) as total_score, count(*) as games_played, total_games.tot as total_games\nfrom bs_game_progress bgp\njoin users on users.id = bgp.user\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin valid_dates on bgs.publish_on = valid_date\njoin total_games\nwhere bgp.user != \"\"\ngroup by bgp.user"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u8mcqogc",
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
    "id": "mhowj8kg",
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
    "id": "icmfmw5p",
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
    "id": "pqeio2bo",
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
    "id": "wzhsysqc",
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
  collection.schema.removeField("utdimo0l")

  // remove
  collection.schema.removeField("3tshr5yb")

  // remove
  collection.schema.removeField("y89xtmpr")

  // remove
  collection.schema.removeField("hq3mjzq2")

  // remove
  collection.schema.removeField("seehqwvm")

  return dao.saveCollection(collection)
})
