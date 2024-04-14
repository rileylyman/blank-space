/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3scxbo9s722gcmh")

  collection.options = {
    "query": "with timezone as (\n  select '-7 hours' as tz\n)\nselect 0 as id,\n    datetime('now', tz) as now\nfrom timezone"
  }

  // remove
  collection.schema.removeField("beb1o4ri")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ohdkzmil",
    "name": "now",
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
  const collection = dao.findCollectionByNameOrId("3scxbo9s722gcmh")

  collection.options = {
    "query": "select 0 as id, datetime('now', '-7 hours') as pst_now"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "beb1o4ri",
    "name": "pst_now",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("ohdkzmil")

  return dao.saveCollection(collection)
})
