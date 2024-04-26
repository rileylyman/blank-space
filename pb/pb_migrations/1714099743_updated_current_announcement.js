/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qwzp3rl5mgfwiag")

  collection.options = {
    "query": "select id, title, message, max(release_on) as release_on, created, updated\nfrom announcements\nwhere datetime(release_on) <= datetime('now')"
  }

  // remove
  collection.schema.removeField("w6nmdgzh")

  // remove
  collection.schema.removeField("woltneto")

  // remove
  collection.schema.removeField("nojvbmtb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "act0nxrx",
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
    "id": "r0ms9bgt",
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
    "id": "ctyi8ywe",
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
    "query": "select id, title, message, max(release_on) as release_on, created, updated\nfrom announcements\nwhere datetime(release_on) <= datetime('now') and title != \"\""
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w6nmdgzh",
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
    "id": "woltneto",
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
    "id": "nojvbmtb",
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
  collection.schema.removeField("act0nxrx")

  // remove
  collection.schema.removeField("r0ms9bgt")

  // remove
  collection.schema.removeField("ctyi8ywe")

  return dao.saveCollection(collection)
})
