/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogjueoewd2pdcra")

  collection.options = {
    "query": "with played_on as (\n  select distinct \n      bgp.user,\n      julianday('now') - julianday(bgs.publish_on) as days_ago,\n      bgs.publish_on\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n)\nselect \n  user, days_ago, datetime('now') as now, publish_on, (row_number() over()) as id\nfrom played_on"
  }

  // remove
  collection.schema.removeField("n0f81kki")

  // remove
  collection.schema.removeField("ar6jio1q")

  // remove
  collection.schema.removeField("wzcnixpi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5ihjax10",
    "name": "user",
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
    "id": "gd6xius6",
    "name": "days_ago",
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
    "id": "shl9ivwm",
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
    "id": "7c94u6km",
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
  const collection = dao.findCollectionByNameOrId("ogjueoewd2pdcra")

  collection.options = {
    "query": "with played_on as (\n  select distinct \n      bgp.user,\n      julianday('now') - julianday(bgs.publish_on) as days_ago,\n      bgs.publish_on\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n)\nselect \n  user, days_ago, publish_on, (row_number() over()) as id\nfrom played_on"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n0f81kki",
    "name": "user",
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
    "id": "ar6jio1q",
    "name": "days_ago",
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
    "id": "wzcnixpi",
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
  collection.schema.removeField("5ihjax10")

  // remove
  collection.schema.removeField("gd6xius6")

  // remove
  collection.schema.removeField("shl9ivwm")

  // remove
  collection.schema.removeField("7c94u6km")

  return dao.saveCollection(collection)
})