/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "hprojqeqgxf9gv5",
    "created": "2024-04-08 00:48:07.509Z",
    "updated": "2024-04-08 00:48:07.509Z",
    "name": "bs_recent_progress",
    "type": "view",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
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
      },
      {
        "system": false,
        "id": "2dygeexd",
        "name": "won",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "fzdwgod5",
        "name": "lost",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
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
      },
      {
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
      },
      {
        "system": false,
        "id": "anqi4aky",
        "name": "local_dict",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "select prog.id, prog.bs_game, prog.user, prog.guesses, prog.won, prog.lost, prog.bs_game_set, prog.score, prog.local_dict, prog.created, prog.updated\nfrom bs_game_progress as prog\njoin time_utils\njoin bs_game_sets on bs_game_set = bs_game_sets.id\nwhere date(publish_on) = date(now)\n  or date(publish_on) = date(now, '-1 day')"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("hprojqeqgxf9gv5");

  return dao.deleteCollection(collection);
})
