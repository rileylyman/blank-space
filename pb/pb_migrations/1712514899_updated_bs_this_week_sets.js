/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kqww6x3ev18wolq")

  collection.options = {
    "query": "with valid_dates as (\n  select date(publish_on) as valid_date\n  from bs_game_sets\n  join time_utils\n  where valid_date >= week0 and valid_date <= date(now)\n)\nselect id, games, publish_on, created, updated\nfrom bs_game_sets\njoin valid_dates on date(publish_on) = valid_date"
  }

  // remove
  collection.schema.removeField("vjqfd8ck")

  // remove
  collection.schema.removeField("dpspsre3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bcznzxjx",
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
    "id": "dlwj52d3",
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
  const collection = dao.findCollectionByNameOrId("kqww6x3ev18wolq")

  collection.options = {
    "query": "with valid_dates as (\n  select publish_on as valid_date\n  from bs_game_sets\n  where date(publish_on) >= \n        date(julianday('now') - strftime('%w', datetime('now', '-7 hours')))\n    and datetime(publish_on) <= datetime('now')\n)\nselect id, games, publish_on, created, updated\nfrom bs_game_sets\njoin valid_dates on publish_on = valid_date"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vjqfd8ck",
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
    "id": "dpspsre3",
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
  collection.schema.removeField("bcznzxjx")

  // remove
  collection.schema.removeField("dlwj52d3")

  return dao.saveCollection(collection)
})
