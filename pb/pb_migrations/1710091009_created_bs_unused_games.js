/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "799dtk8s0tjd89z",
    "created": "2024-03-10 17:16:49.772Z",
    "updated": "2024-03-10 17:16:49.772Z",
    "name": "bs_unused_games",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8mwgowkj",
        "name": "0",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
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
      "query": "select id, games[0] from bs_game_sets"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("799dtk8s0tjd89z");

  return dao.deleteCollection(collection);
})
