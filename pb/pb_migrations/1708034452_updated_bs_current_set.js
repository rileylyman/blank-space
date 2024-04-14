/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k3g5i9pw1095702")

  collection.options = {
    "query": "with next_set as (\n  select\n    min(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on > datetime('now')\n)\nselect\n  id,\n  games,\n  max(bs_game_sets.publish_on) as publish_on,\n  next_set.publish_on as next_set_avail\nfrom bs_game_sets\njoin next_set\nwhere bs_game_sets.publish_on <= datetime('now')"
  }

  // remove
  collection.schema.removeField("u7n15ajx")

  // remove
  collection.schema.removeField("jvivqies")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2a9tqorg",
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
    "id": "gxthyoqy",
    "name": "publish_on",
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
    "id": "dd3akehr",
    "name": "next_set_avail",
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
  const collection = dao.findCollectionByNameOrId("k3g5i9pw1095702")

  collection.options = {
    "query": "select\n  id,\n  games,\n  max(publish_on) as publish_on\nfrom bs_game_sets\nwhere publish_on <= datetime('now')"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u7n15ajx",
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
    "id": "jvivqies",
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
  collection.schema.removeField("2a9tqorg")

  // remove
  collection.schema.removeField("gxthyoqy")

  // remove
  collection.schema.removeField("dd3akehr")

  return dao.saveCollection(collection)
})
