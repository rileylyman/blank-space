/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ieafwerbaq1p5k6",
    "created": "2024-02-15 21:14:06.546Z",
    "updated": "2024-02-15 23:30:34.053Z",
    "name": "bs_current_set_progress",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jdayyaew",
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
        "id": "0gfknjtt",
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
        "id": "yyyice7j",
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
        "id": "arvfbbls",
        "name": "won",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "ljxqzuif",
        "name": "lost",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "user = @request.auth.id",
    "viewRule": "user = @request.auth.id",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "select\n  bgp.id as id,\n  bgp.user,\n  bgp.bs_game,\n  bgp.guesses,\n  bgp.won,\n  bgp.lost\nfrom bs_game_progress bgp\njoin bs_current_set bcs\n  on json_extract(bcs.games, '$') like '%' || bgp.bs_game || '%'\n\n"
    }
  });

  return Dao(db).saveCollection(collection);
})
