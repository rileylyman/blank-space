/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3scxbo9s722gcmh")

  collection.options = {
    "query": "with timezone as (\n  select '-7 hours' as tz\n),\nnow as (\n  select datetime('now', tz) as now\n  from timezone\n)\nselect 0 as id, now, \n  datetime(date(julianday(now) - strftime('%w', now))) as week0,\n  datetime(date(julianday(now) - strftime('%w', now) - 7)) as weekm7\nfrom now"
  }

  // remove
  collection.schema.removeField("mveafs1j")

  // remove
  collection.schema.removeField("5h2wwgnx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qdyg9mdv",
    "name": "now",
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
    "id": "v26gzaej",
    "name": "week0",
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
    "id": "nrorwago",
    "name": "weekm7",
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
    "query": "with timezone as (\n  select '-7 hours' as tz\n),\nnow as (\n  select datetime('now', tz) as now\n  from timezone\n)\nselect 0 as id, now, \n  datetime(date(julianday(now) - strftime('%w', now))) as week0\nfrom now"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mveafs1j",
    "name": "now",
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
    "id": "5h2wwgnx",
    "name": "week0",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("qdyg9mdv")

  // remove
  collection.schema.removeField("v26gzaej")

  // remove
  collection.schema.removeField("nrorwago")

  return dao.saveCollection(collection)
})
