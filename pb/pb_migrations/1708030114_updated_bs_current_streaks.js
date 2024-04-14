/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogjueoewd2pdcra")

  collection.options = {
    "query": "with played_days_ago as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n)\nselect \n  user,\n  (row_number() over(partition by user order by days_ago)) as rn,\n  days_ago,\n  (row_number() over()) as id\nfrom played_days_ago"
  }

  // remove
  collection.schema.removeField("z3psxmsq")

  // remove
  collection.schema.removeField("wkiusv9d")

  // remove
  collection.schema.removeField("pj3qisx3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tpqbiajh",
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
    "id": "voldce4p",
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
    "id": "vh2bzxbo",
    "name": "days_ago",
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
    "query": "with played_on as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago,\n      bgs.publish_on\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n)\nselect \n  user,\n  (row_number() over(partition by user order by publish_on desc)) as rn,\n  days_ago,\n  (row_number() over()) as id\nfrom played_on"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z3psxmsq",
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
    "id": "wkiusv9d",
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
    "id": "pj3qisx3",
    "name": "days_ago",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("tpqbiajh")

  // remove
  collection.schema.removeField("voldce4p")

  // remove
  collection.schema.removeField("vh2bzxbo")

  return dao.saveCollection(collection)
})
