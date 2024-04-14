/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m37hwzd34ul7612")

  collection.options = {
    "query": "select \n  (ROW_NUMBER() OVER()) as id,\n  bgp.user,\n  username,\n  sum(bgp.score) as total_score,\n  count(*) as games_played\nfrom bs_game_progress bgp\njoin users on user = users.id\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin time_utils\nwhere bgp.user != \"\" \n  and (bgp.won or bgp.lost)\n  and date(bgs.publish_on) >= weekm7 \n  and date(bgs.publish_on) < week0\ngroup by bgp.user"
  }

  // remove
  collection.schema.removeField("rjkvpe8t")

  // remove
  collection.schema.removeField("hgqyy3ye")

  // remove
  collection.schema.removeField("fmo4rtm6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rjb92yvb",
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
    "id": "ztrvykng",
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
    "id": "qk7mavxg",
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
    "id": "a0mf933m",
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
  const collection = dao.findCollectionByNameOrId("m37hwzd34ul7612")

  collection.options = {
    "query": "select \n  (ROW_NUMBER() OVER()) as id,\n  bgp.user,\n  sum(bgp.score) as total_score,\n  count(*) as games_played\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin time_utils\nwhere bgp.user != \"\" \n  and (bgp.won or bgp.lost)\n  and date(bgs.publish_on) >= weekm7\n  and date(bgs.publish_on) < week0\ngroup by bgp.user"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rjkvpe8t",
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
    "id": "hgqyy3ye",
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
    "id": "fmo4rtm6",
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
  collection.schema.removeField("rjb92yvb")

  // remove
  collection.schema.removeField("ztrvykng")

  // remove
  collection.schema.removeField("qk7mavxg")

  // remove
  collection.schema.removeField("a0mf933m")

  return dao.saveCollection(collection)
})
