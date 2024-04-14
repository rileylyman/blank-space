/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "select\n  bgs.id as id,\n  users.id as user_id,\n  games,\n  (MAX(publish_on) over(partition by users.id)) as publish_on\nfrom bs_game_sets bgs\njoin users\nwhere publish_on <= datetime('now')\n\n"
  }

  // remove
  collection.schema.removeField("tqufqc8h")

  // remove
  collection.schema.removeField("qccw7tgb")

  // remove
  collection.schema.removeField("hmvtbsrb")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "select\n  bgs.id as id,\n  users.id as user_id,\n  games,\n  MAX(publish_on) as publish_on\nfrom bs_game_sets bgs\njoin users\nwhere publish_on <= datetime('now')\n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tqufqc8h",
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
    "id": "qccw7tgb",
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
    "id": "hmvtbsrb",
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
  collection.schema.removeField("cc0ejiqb")

  // remove
  collection.schema.removeField("o5ytvxvb")

  // remove
  collection.schema.removeField("51ectiqa")

  return dao.saveCollection(collection)
})
