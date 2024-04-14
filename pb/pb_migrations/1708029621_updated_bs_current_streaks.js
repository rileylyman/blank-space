/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogjueoewd2pdcra")

  collection.options = {
    "query": "with played_on as (\n  select distinct \n      bgp.user,\n      julianday('now') - julianday(bgs.publish_on) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n)\nselect \n  user, days_ago, (row_number() over()) as id\nfrom played_on"
  }

  // remove
  collection.schema.removeField("7ploltdy")

  // remove
  collection.schema.removeField("g1x0jdaj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iqkdpoe0",
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
    "id": "iyocojue",
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
    "query": "with played_on as (\n  select distinct \n      bgp.user,\n      julianday(date('now')) - julianday(date(bgs.publish_on)) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n)\nselect \n  user, days_ago, (row_number() over()) as id\nfrom played_on"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7ploltdy",
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
    "id": "g1x0jdaj",
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
  collection.schema.removeField("iqkdpoe0")

  // remove
  collection.schema.removeField("iyocojue")

  return dao.saveCollection(collection)
})
