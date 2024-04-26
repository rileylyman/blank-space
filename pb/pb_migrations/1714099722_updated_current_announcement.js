/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwzp3rl5mgfwiag")

  collection.options = {
    "query": "select id, title, message, max(release_on) as release_on, created, updated\nfrom announcements\nwhere datetime(release_on) <= datetime('now') and id != \"\""
  }

  // remove
  collection.schema.removeField("sj3nq8c2")

  // remove
  collection.schema.removeField("sdmt4tgo")

  // remove
  collection.schema.removeField("00tdcfhu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dbmalgv4",
    "name": "title",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "umgspcsv",
    "name": "message",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tqarv1ad",
    "name": "release_on",
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
  const collection = dao.findCollectionByNameOrId("qwzp3rl5mgfwiag")

  collection.options = {
    "query": "select id, title, message, max(release_on) as release_on, created, updated\nfrom announcements\nwhere datetime(release_on) <= datetime('now') and id != null"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sj3nq8c2",
    "name": "title",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sdmt4tgo",
    "name": "message",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "00tdcfhu",
    "name": "release_on",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("dbmalgv4")

  // remove
  collection.schema.removeField("umgspcsv")

  // remove
  collection.schema.removeField("tqarv1ad")

  return dao.saveCollection(collection)
})
