/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogjueoewd2pdcra")

  collection.options = {
    "query": "select bgp.user, bgs.publish_on, (row_number() over()) as id\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\nwhere julianday(bgs.publish_on) <= julianday('now')"
  }

  // remove
  collection.schema.removeField("3toivrmn")

  // remove
  collection.schema.removeField("ftexjmkm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g3jkdxvn",
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
    "id": "35qavgzv",
    "name": "publish_on",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogjueoewd2pdcra")

  collection.options = {
    "query": "select bgp.user, bgs.publish_on, (row_number() over()) as id\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\nwhere julianday(bgs.publish_on) <= julianday(date('now'))"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3toivrmn",
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
    "id": "ftexjmkm",
    "name": "publish_on",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("g3jkdxvn")

  // remove
  collection.schema.removeField("35qavgzv")

  return dao.saveCollection(collection)
})
