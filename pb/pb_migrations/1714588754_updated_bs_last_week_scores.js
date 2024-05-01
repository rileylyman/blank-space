/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37hwzd34ul7612")

  collection.options = {
    "query": "select \n  (ROW_NUMBER() OVER()) as id,\n  bgp.user,\n  username,\n  sum(bgp.score) as total_score,\n  count(*) as games_played,\n  GROUP_CONCAT(flags) as agg_flags\nfrom bs_game_progress bgp\njoin users on user = users.id\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin time_utils\nwhere bgp.user != \"\" \n  and (bgp.won or bgp.lost)\n  and date(bgs.publish_on) >= weekm7 \n  and date(bgs.publish_on) < week0\ngroup by bgp.user"
  }

  // remove
  collection.schema.removeField("bsm7eyvw")

  // remove
  collection.schema.removeField("42ppezjn")

  // remove
  collection.schema.removeField("4kuad4ne")

  // remove
  collection.schema.removeField("jngosxbi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pgaunqfk",
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
    "id": "p2yemwvx",
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
    "id": "f52wndsu",
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
    "id": "fokgkmax",
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
    "id": "xv0jkqrh",
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
  const collection = dao.findCollectionByNameOrId("m37hwzd34ul7612")

  collection.options = {
    "query": "select \n  (ROW_NUMBER() OVER()) as id,\n  bgp.user,\n  username,\n  sum(bgp.score) as total_score,\n  count(*) as games_played\nfrom bs_game_progress bgp\njoin users on user = users.id\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin time_utils\nwhere bgp.user != \"\" \n  and (bgp.won or bgp.lost)\n  and date(bgs.publish_on) >= weekm7 \n  and date(bgs.publish_on) < week0\ngroup by bgp.user"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bsm7eyvw",
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
    "id": "42ppezjn",
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
    "id": "4kuad4ne",
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
    "id": "jngosxbi",
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
  collection.schema.removeField("pgaunqfk")

  // remove
  collection.schema.removeField("p2yemwvx")

  // remove
  collection.schema.removeField("f52wndsu")

  // remove
  collection.schema.removeField("fokgkmax")

  // remove
  collection.schema.removeField("xv0jkqrh")

  return dao.saveCollection(collection)
})
