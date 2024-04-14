/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "select\n  bgs.id as id,\n  users.id as user_id,\n  games,\n  MAX(publish_on) as publish_on\nfrom bs_game_sets bgs\njoin users\nwhere publish_on <= datetime('now')\ngroup by user_id\n"
  }

  // remove
  collection.schema.removeField("cc0ejiqb")

  // remove
  collection.schema.removeField("o5ytvxvb")

  // remove
  collection.schema.removeField("51ectiqa")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7cdqsuqn",
    "name": "user_id",
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
    "id": "smjv3xdv",
    "name": "games",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tarz1503wkeorcs",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jscj2wmw",
    "name": "publish_on",
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
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "select\n  bgs.id as id,\n  users.id as user_id,\n  games,\n  (MAX(publish_on) over(partition by users.id)) as publish_on\nfrom bs_game_sets bgs\njoin users\nwhere publish_on <= datetime('now')\n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cc0ejiqb",
    "name": "user_id",
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
    "id": "o5ytvxvb",
    "name": "games",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tarz1503wkeorcs",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "51ectiqa",
    "name": "publish_on",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("7cdqsuqn")

  // remove
  collection.schema.removeField("smjv3xdv")

  // remove
  collection.schema.removeField("jscj2wmw")

  return dao.saveCollection(collection)
})
