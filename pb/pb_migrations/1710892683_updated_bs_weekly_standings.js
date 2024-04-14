/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0n9kxrhwnd0wcn6")

  collection.options = {
    "query": "with valid_dates as (\n  select publish_on as valid_date\n  from bs_game_sets\n  where date(publish_on) >= date(julianday('now') - strftime('%w', 'now'))\n    and date(publish_on) <= date('now')\n),\ntotal_games as (\n  select COUNT(*) * 4 as tot\n  from valid_dates\n)\nselect (ROW_NUMBER() OVER()) as id, bgp.user, total_games.tot as total_games, count(*) as games_played, sum(bgp.score) as total_score\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin valid_dates on bgs.publish_on = valid_date\njoin total_games\nwhere bgp.user != \"\"\ngroup by bgp.user"
  }

  // remove
  collection.schema.removeField("j5pa7nt1")

  // remove
  collection.schema.removeField("pgkeljao")

  // remove
  collection.schema.removeField("61tzkzj7")

  // remove
  collection.schema.removeField("teytunmo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g5jdzx7y",
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
    "id": "mlogltir",
    "name": "total_games",
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
    "id": "wlwyhyyx",
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
    "id": "5ikz9ikn",
    "name": "total_score",
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
  const collection = dao.findCollectionByNameOrId("0n9kxrhwnd0wcn6")

  collection.options = {
    "query": "with valid_dates as (\n  select publish_on as valid_date\n  from bs_game_sets\n  where date(publish_on) >= date(julianday('now') - strftime('%w', 'now'))\n    and date(publish_on) <= date('now')\n),\ntotal_games as (\n  select COUNT(*) * 4 as tot\n  from valid_dates\n)\nselect (ROW_NUMBER() OVER()) as id, bgp.user, total_games.tot, count(*) as games_played, sum(bgp.score) as total_score\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin valid_dates on bgs.publish_on = valid_date\njoin total_games\nwhere bgp.user != \"\"\ngroup by bgp.user"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j5pa7nt1",
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
    "id": "pgkeljao",
    "name": "tot",
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
    "id": "61tzkzj7",
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
    "id": "teytunmo",
    "name": "total_score",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("g5jdzx7y")

  // remove
  collection.schema.removeField("mlogltir")

  // remove
  collection.schema.removeField("wlwyhyyx")

  // remove
  collection.schema.removeField("5ikz9ikn")

  return dao.saveCollection(collection)
})
