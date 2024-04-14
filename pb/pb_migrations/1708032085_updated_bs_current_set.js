/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "select\n  bgs.id as id,\n  users.id as user_id,\n  games,\n  MAX(publish_on) as publish_on\nfrom bs_game_sets bgs\njoin users\nwhere publish_on <= datetime('now')\n\n"
  }

  // remove
  collection.schema.removeField("iws4ovrx")

  // remove
  collection.schema.removeField("p1xd9zry")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "select\n  id,\n  games,\n  MAX(publish_on) as publish_on\nfrom bs_game_sets bgs\nwhere publish_on <= datetime('now')\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iws4ovrx",
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
    "id": "p1xd9zry",
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
  collection.schema.removeField("tqufqc8h")

  // remove
  collection.schema.removeField("qccw7tgb")

  // remove
  collection.schema.removeField("hmvtbsrb")

  return dao.saveCollection(collection)
})
