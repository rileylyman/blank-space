/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0n9kxrhwnd0wcn6")

  collection.options = {
    "query": "select \n  (ROW_NUMBER() OVER()) as id,\n  bgp.user,\n  username,\n  sum(bgp.score) as total_score,\n  count(*) as games_played\nfrom bs_game_progress bgp\njoin users on user = users.id\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin time_utils\nwhere bgp.user != \"\" \n  and (bgp.won or bgp.lost)\n  and date(bgs.publish_on) >= week0 \n  and date(bgs.publish_on) <= date(now)\ngroup by bgp.user"
  }

  // remove
  collection.schema.removeField("qkhdzd6n")

  // remove
  collection.schema.removeField("t2gqbamk")

  // remove
  collection.schema.removeField("ytqvejfk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "stmom3pq",
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
    "id": "talmx7hu",
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
    "id": "fyo3lmuz",
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
    "id": "yfkwws3a",
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
    "query": "select \n  (ROW_NUMBER() OVER()) as id,\n  bgp.user,\n  sum(bgp.score) as total_score,\n  count(*) as games_played\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin time_utils\nwhere bgp.user != \"\" \n  and (bgp.won or bgp.lost)\n  and date(bgs.publish_on) >= week0 \n  and date(bgs.publish_on) <= date(now)\ngroup by bgp.user"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qkhdzd6n",
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
    "id": "t2gqbamk",
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
    "id": "ytqvejfk",
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
  collection.schema.removeField("stmom3pq")

  // remove
  collection.schema.removeField("talmx7hu")

  // remove
  collection.schema.removeField("fyo3lmuz")

  // remove
  collection.schema.removeField("yfkwws3a")

  return dao.saveCollection(collection)
})
