/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0n9kxrhwnd0wcn6")

  collection.options = {
    "query": "select \n  (ROW_NUMBER() OVER()) as id,\n  bgp.user,\n  username,\n  sum(bgp.score) as total_score,\n  count(*) as games_played,\n  GROUP_CONCAT(flags) as agg_flags\nfrom bs_game_progress bgp\njoin users on user = users.id\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin time_utils\nwhere bgp.user != \"\" \n  and (bgp.won or bgp.lost)\n  and date(bgs.publish_on) >= week0 \n  and date(bgs.publish_on) <= date(now)\ngroup by bgp.user"
  }

  // remove
  collection.schema.removeField("wytx9snk")

  // remove
  collection.schema.removeField("ywswquk9")

  // remove
  collection.schema.removeField("6dfobkic")

  // remove
  collection.schema.removeField("imetemtd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pvwc9qvc",
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
    "id": "vhmrabzy",
    "name": "username",
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
    "id": "nyanryk6",
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
    "id": "qsteia1b",
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
    "id": "wwlmtbbm",
    "name": "agg_flags",
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
    "query": "select \n  (ROW_NUMBER() OVER()) as id,\n  bgp.user,\n  username,\n  sum(bgp.score) as total_score,\n  count(*) as games_played\nfrom bs_game_progress bgp\njoin users on user = users.id\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin time_utils\nwhere bgp.user != \"\" \n  and (bgp.won or bgp.lost)\n  and date(bgs.publish_on) >= week0 \n  and date(bgs.publish_on) <= date(now)\ngroup by bgp.user"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wytx9snk",
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
    "id": "ywswquk9",
    "name": "username",
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
    "id": "6dfobkic",
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
    "id": "imetemtd",
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
  collection.schema.removeField("pvwc9qvc")

  // remove
  collection.schema.removeField("vhmrabzy")

  // remove
  collection.schema.removeField("nyanryk6")

  // remove
  collection.schema.removeField("qsteia1b")

  // remove
  collection.schema.removeField("wwlmtbbm")

  return dao.saveCollection(collection)
})
