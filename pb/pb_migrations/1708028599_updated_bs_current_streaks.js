/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ogjueoewd2pdcra")

  collection.options = {
    "query": "with played_on as (\n  select distinct \n      bgp.user,\n      bgs.publish_on\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n)\nselect user, publish_on, (row_number() over()) as id\nfrom played_on"
  }

  // remove
  collection.schema.removeField("n9wtugim")

  // remove
  collection.schema.removeField("ipgreown")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "67stkjpd",
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
    "id": "nfwhuzb0",
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
    "query": "select distinct bgp.user, bgs.publish_on, (row_number() over(partition by publish_on)) as id\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\nwhere julianday(bgs.publish_on) <= julianday('now')"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n9wtugim",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ipgreown",
    "name": "publish_on",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("67stkjpd")

  // remove
  collection.schema.removeField("nfwhuzb0")

  return dao.saveCollection(collection)
})
