/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogjueoewd2pdcra")

  collection.options = {
    "query": "select distinct bgp.user, bgs.publish_on, (row_number() over(partition by publish_on)) as id\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\nwhere julianday(bgs.publish_on) <= julianday('now')"
  }

  // remove
  collection.schema.removeField("m30y2uhf")

  // remove
  collection.schema.removeField("gofkfkni")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n9wtugim",
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
    "id": "ipgreown",
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
    "query": "select distinct bgp.user, bgs.publish_on, (row_number() over()) as id\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\nwhere julianday(bgs.publish_on) <= julianday('now')"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m30y2uhf",
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
    "id": "gofkfkni",
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
  collection.schema.removeField("n9wtugim")

  // remove
  collection.schema.removeField("ipgreown")

  return dao.saveCollection(collection)
})
