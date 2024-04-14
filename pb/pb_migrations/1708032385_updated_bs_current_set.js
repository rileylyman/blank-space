/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "with current_set as (\n  select\n    id,\n    games,\n    max(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on <= datetime('now')\n)\nselect\n  current_set.id as id,\n  users.id as user,\n  games,\n  publish_on\nfrom current_set\nfull join users\n\n"
  }

  // remove
  collection.schema.removeField("gu36rrff")

  // remove
  collection.schema.removeField("zi1fievv")

  // remove
  collection.schema.removeField("djtsxsky")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rrwchauj",
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
    "id": "vn7mwom4",
    "name": "games",
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
    "id": "ytvnvofs",
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
    "query": "with current_set as (\n  select\n    id,\n    games,\n    max(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on <= datetime('now')\n)\nselect\n  current_set.id as id,\n  users.id as user,\n  games,\n  publish_on\nfrom current_set\njoin users\n\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gu36rrff",
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
    "id": "zi1fievv",
    "name": "games",
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
    "id": "djtsxsky",
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
  collection.schema.removeField("rrwchauj")

  // remove
  collection.schema.removeField("vn7mwom4")

  // remove
  collection.schema.removeField("ytvnvofs")

  return dao.saveCollection(collection)
})
