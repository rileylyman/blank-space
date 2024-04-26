/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwzp3rl5mgfwiag")

  collection.options = {
    "query": "select id, title, message, max(release_on) as release_on, created, updated\nfrom announcements\nwhere datetime(release_on) <= datetime('now') and id != null"
  }

  // remove
  collection.schema.removeField("fur0ljn0")

  // remove
  collection.schema.removeField("tv9ecdzu")

  // remove
  collection.schema.removeField("1gn1jsxh")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwzp3rl5mgfwiag")

  collection.options = {
    "query": "select id, title, message, max(release_on) as release_on, created, updated\nfrom announcements\nwhere datetime(release_on) <= datetime('now')"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fur0ljn0",
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
    "id": "tv9ecdzu",
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
    "id": "1gn1jsxh",
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
  collection.schema.removeField("sj3nq8c2")

  // remove
  collection.schema.removeField("sdmt4tgo")

  // remove
  collection.schema.removeField("00tdcfhu")

  return dao.saveCollection(collection)
})
