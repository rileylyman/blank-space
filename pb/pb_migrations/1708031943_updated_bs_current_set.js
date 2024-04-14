/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "select\n  id,\n  games,\n  MAX(publish_on) as publish_on\nfrom bs_game_sets bgs\nwhere publish_on <= datetime('now')\n"
  }

  // remove
  collection.schema.removeField("vfnbf11u")

  // remove
  collection.schema.removeField("m2ktgaxt")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6")

  collection.options = {
    "query": "select\n  id,\n  games,\n  MAX(publish_on) as publish_on\nfrom bs_game_sets bgs\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vfnbf11u",
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
    "id": "m2ktgaxt",
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
  collection.schema.removeField("iws4ovrx")

  // remove
  collection.schema.removeField("p1xd9zry")

  return dao.saveCollection(collection)
})
