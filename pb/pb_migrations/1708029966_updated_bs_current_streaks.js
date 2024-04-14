/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogjueoewd2pdcra")

  collection.options = {
    "query": "with played_on as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago,\n      bgs.publish_on\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n)\nselect \n  user,\n  (row_number() over(partition by user order by publish_on desc)) as rn,\n  days_ago, datetime('now') as now, publish_on, (row_number() over()) as id\nfrom played_on"
  }

  // remove
  collection.schema.removeField("d4llo6vv")

  // remove
  collection.schema.removeField("xmf210pk")

  // remove
  collection.schema.removeField("85plzkbl")

  // remove
  collection.schema.removeField("g1oo7pg8")

  // remove
  collection.schema.removeField("m3tlqv6s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eu6moy09",
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
    "id": "7uveznps",
    "name": "rn",
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
    "id": "f62nb0dl",
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
    "id": "hsnlzt8l",
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
    "id": "plp9whtp",
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
    "query": "with played_on as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago,\n      bgs.publish_on,\n      (row_number() over (partition by bgp.user order by bgs.publish_on desc)) as rn\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n)\nselect \n  user, rn, days_ago, datetime('now') as now, publish_on, (row_number() over()) as id\nfrom played_on"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d4llo6vv",
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
    "id": "xmf210pk",
    "name": "rn",
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
    "id": "85plzkbl",
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
    "id": "g1oo7pg8",
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
    "id": "m3tlqv6s",
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
  collection.schema.removeField("eu6moy09")

  // remove
  collection.schema.removeField("7uveznps")

  // remove
  collection.schema.removeField("f62nb0dl")

  // remove
  collection.schema.removeField("hsnlzt8l")

  // remove
  collection.schema.removeField("plp9whtp")

  return dao.saveCollection(collection)
})
