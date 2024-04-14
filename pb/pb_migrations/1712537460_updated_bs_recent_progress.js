/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hprojqeqgxf9gv5")

  collection.options = {
    "query": "select prog.id, prog.bs_game, prog.user, prog.guesses, prog.won, prog.lost, prog.bs_game_set, prog.score, prog.local_dict, prog.created, prog.updated\nfrom bs_game_progress as prog\njoin time_utils\njoin bs_game_sets on bs_game_set = bs_game_sets.id\nwhere date(publish_on) = date(now)\n  or date(publish_on) = date(now, '-1 day')\norder by prog.created desc"
  }

  // remove
  collection.schema.removeField("yzxv5ujx")

  // remove
  collection.schema.removeField("liclehua")

  // remove
  collection.schema.removeField("dpluulf6")

  // remove
  collection.schema.removeField("2dygeexd")

  // remove
  collection.schema.removeField("fzdwgod5")

  // remove
  collection.schema.removeField("3gryocpt")

  // remove
  collection.schema.removeField("nsgscs1c")

  // remove
  collection.schema.removeField("anqi4aky")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ndge6s8q",
    "name": "bs_game",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tarz1503wkeorcs",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7rairvgh",
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
    "id": "jfb0bi66",
    "name": "guesses",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t62x4jvh",
    "name": "won",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dukychus",
    "name": "lost",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yfklwyht",
    "name": "bs_game_set",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "art2fab3pwic9go",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lwtzfasg",
    "name": "score",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vtmdgtdi",
    "name": "local_dict",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hprojqeqgxf9gv5")

  collection.options = {
    "query": "select prog.id, prog.bs_game, prog.user, prog.guesses, prog.won, prog.lost, prog.bs_game_set, prog.score, prog.local_dict, prog.created, prog.updated\nfrom bs_game_progress as prog\njoin time_utils\njoin bs_game_sets on bs_game_set = bs_game_sets.id\nwhere date(publish_on) = date(now)\n  or date(publish_on) = date(now, '-1 day')"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yzxv5ujx",
    "name": "bs_game",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "tarz1503wkeorcs",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "liclehua",
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
    "id": "dpluulf6",
    "name": "guesses",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2dygeexd",
    "name": "won",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fzdwgod5",
    "name": "lost",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3gryocpt",
    "name": "bs_game_set",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "art2fab3pwic9go",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nsgscs1c",
    "name": "score",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "anqi4aky",
    "name": "local_dict",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("ndge6s8q")

  // remove
  collection.schema.removeField("7rairvgh")

  // remove
  collection.schema.removeField("jfb0bi66")

  // remove
  collection.schema.removeField("t62x4jvh")

  // remove
  collection.schema.removeField("dukychus")

  // remove
  collection.schema.removeField("yfklwyht")

  // remove
  collection.schema.removeField("lwtzfasg")

  // remove
  collection.schema.removeField("vtmdgtdi")

  return dao.saveCollection(collection)
})
