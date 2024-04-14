/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k3g5i9pw1095702")

  collection.options = {
    "query": "with next_set as (\n  select\n    min(publish_on) as publish_on\n  from bs_game_sets\n  join time_utils\n  where date(publish_on) > date(now)\n)\nselect\n  bs_game_sets.id as id,\n  games,\n  max(bs_game_sets.publish_on) as publish_on,\n  next_set.publish_on as next_set_avail\nfrom bs_game_sets\njoin next_set\njoin time_utils\nwhere date(bs_game_sets.publish_on) <= date(now)"
  }

  // remove
  collection.schema.removeField("gfrnkthr")

  // remove
  collection.schema.removeField("0y7f3qik")

  // remove
  collection.schema.removeField("wera2zxt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oczrbrm1",
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
    "id": "giqmnpmf",
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
    "id": "ozqsfp7o",
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
    "query": "with next_set as (\n  select\n    min(publish_on) as publish_on\n  from bs_game_sets\n  where publish_on > datetime('now')\n)\nselect\n  id,\n  games,\n  max(bs_game_sets.publish_on) as publish_on,\n  next_set.publish_on as next_set_avail\nfrom bs_game_sets\njoin next_set\nwhere bs_game_sets.publish_on <= datetime('now')"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gfrnkthr",
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
    "id": "0y7f3qik",
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
    "id": "wera2zxt",
    "name": "next_set_avail",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("oczrbrm1")

  // remove
  collection.schema.removeField("giqmnpmf")

  // remove
  collection.schema.removeField("ozqsfp7o")

  return dao.saveCollection(collection)
})
