/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kbxij0xdn1yxq4c")

  collection.options = {
    "query": "with valid_dates as (\n  select publish_on as valid_date\n  from bs_game_sets\n  where date(publish_on) >= \n        date(julianday('now') - strftime('%w', datetime('now', '-7 hours')) - 7)\n    and date(publish_on) < date(julianday('now') - strftime('%w', 'now'))\n)\nselect id, games, publish_on, created, updated\nfrom bs_game_sets\njoin valid_dates on publish_on = valid_date"
  }

  // remove
  collection.schema.removeField("qwv8t3ro")

  // remove
  collection.schema.removeField("n3tvqrji")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z2iraqup",
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
    "id": "culjvpu2",
    "name": "publish_on",
    "type": "date",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kbxij0xdn1yxq4c")

  collection.options = {
    "query": "with valid_dates as (\n  select publish_on as valid_date\n  from bs_game_sets\n  where date(publish_on) >= date(julianday('now') - (strftime('%w', 'now') + 7))\n    and date(publish_on) < date(julianday('now') - strftime('%w', 'now'))\n)\nselect id, games, publish_on, created, updated\nfrom bs_game_sets\njoin valid_dates on publish_on = valid_date"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qwv8t3ro",
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
    "id": "n3tvqrji",
    "name": "publish_on",
    "type": "date",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("z2iraqup")

  // remove
  collection.schema.removeField("culjvpu2")

  return dao.saveCollection(collection)
})
