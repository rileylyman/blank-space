/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogjueoewd2pdcra")

  collection.options = {
    "query": "select bgp.user, bgs.publish_on, (row_number() over()) as id\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\nwhere bgs.publish_on <= date('now')"
  }

  // remove
  collection.schema.removeField("3ohqsgji")

  // remove
  collection.schema.removeField("hrqcgzr4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmdnotke",
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
    "id": "agp4weho",
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
    "query": "select bgp.user, bgs.publish_on, (row_number() over()) as id\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3ohqsgji",
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
    "id": "hrqcgzr4",
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
  collection.schema.removeField("rmdnotke")

  // remove
  collection.schema.removeField("agp4weho")

  return dao.saveCollection(collection)
})
