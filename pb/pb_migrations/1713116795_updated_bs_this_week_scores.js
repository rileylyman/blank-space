/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0n9kxrhwnd0wcn6")

  collection.options = {
    "query": "select (ROW_NUMBER() OVER()) as id, bgp.user, sum(bgp.score) as total_score, count(*) as games_played\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on \n  bgs.id = bs_game_set \n\njoin time_utils\nwhere bgp.user != \"\" and (bgp.won or bgp.lost)\ngroup by bgp.user"
  }

  // remove
  collection.schema.removeField("fntfnqz9")

  // remove
  collection.schema.removeField("q7sc4xxh")

  // remove
  collection.schema.removeField("1dy63vja")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jtceglsn",
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
    "id": "arhipfpy",
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
    "id": "acxbnsck",
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
    "query": "select (ROW_NUMBER() OVER()) as id, bgp.user, sum(bgp.score) as total_score, count(*) as games_played\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on \n  bgs.id = bs_game_set \n  and date(bgs.publish_on) > week0 \n  and date(bgs.publish_on) <= date(now)\njoin time_utils\nwhere bgp.user != \"\" and (bgp.won or bgp.lost)\ngroup by bgp.user"
  }

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

  // remove
  collection.schema.removeField("jtceglsn")

  // remove
  collection.schema.removeField("arhipfpy")

  // remove
  collection.schema.removeField("acxbnsck")

  return dao.saveCollection(collection)
})
