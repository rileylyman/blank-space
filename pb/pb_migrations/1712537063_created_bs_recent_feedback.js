/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jh9al3f5krmqrsy",
    "created": "2024-04-08 00:44:23.471Z",
    "updated": "2024-04-08 00:44:23.471Z",
    "name": "bs_recent_feedback",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "f1gzijlo",
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
      },
      {
        "system": false,
        "id": "3temmzjg",
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
      },
      {
        "system": false,
        "id": "djeoq8ab",
        "name": "feedback",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fdcldg2y",
        "name": "tags",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qbx4yltp",
        "name": "thumbs",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "xikz3imy",
        "name": "prog",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "vzzjtkqs3u2crrh",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "select fb.id as id, fb.bs_game, fb.user, feedback, tags, thumbs, prog, fb.created, fb.updated\nfrom bs_game_feedback as fb\njoin time_utils\njoin bs_game_progress on prog = bs_game_progress.id\njoin bs_game_sets on bs_game_set = bs_game_sets.id\nwhere date(publish_on) = date(now)\n  or date(publish_on) = date(now, '-1 day')"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jh9al3f5krmqrsy");

  return dao.deleteCollection(collection);
})
