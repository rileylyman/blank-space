/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0n9kxrhwnd0wcn6")

  collection.options = {
    "query": "select (ROW_NUMBER() OVER()) as id, bgp.user, sum(bgp.score) as total_score, count(*) as games_played\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on \n  bgs.id = bs_game_set\njoin time_utils\nwhere bgp.user != \"\" \n  and (bgp.won or bgp.lost)\n  and date(bgs.publish_on) >= week0 \n  and date(bgs.publish_on) <= date(now)\ngroup by bgp.user"
  }

  // remove
  collection.schema.removeField("okis9swk")

  // remove
  collection.schema.removeField("aevk0sq4")

  // remove
  collection.schema.removeField("utwfcvzu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rfgw6fkb",
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
    "id": "riigkmqh",
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
    "id": "hok78btc",
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
    "query": "select (ROW_NUMBER() OVER()) as id, bgp.user, sum(bgp.score) as total_score, count(*) as games_played\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on \n  bgs.id = bs_game_set\njoin time_utils\nwhere bgp.user != \"\" \n  and (bgp.won or bgp.lost)\n  and date(bgs.publish_on) > week0 \n  and date(bgs.publish_on) <= date(now)\ngroup by bgp.user"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okis9swk",
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
    "id": "aevk0sq4",
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
    "id": "utwfcvzu",
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
  collection.schema.removeField("rfgw6fkb")

  // remove
  collection.schema.removeField("riigkmqh")

  // remove
  collection.schema.removeField("hok78btc")

  return dao.saveCollection(collection)
})
