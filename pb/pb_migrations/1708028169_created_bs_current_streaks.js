/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ogjueoewd2pdcra",
    "created": "2024-02-15 20:16:09.568Z",
    "updated": "2024-02-15 20:16:09.568Z",
    "name": "bs_current_streaks",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "53vkl8yn",
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
        "id": "dzqtymaj",
        "name": "publish_on",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
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
      "query": "select bgp.user, bgs.publish_on, (row_number() over()) as id\nfrom bs_game_progress bgp\njoin bs_game_sets bgs on json_extract(bgs.games, '$')"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ogjueoewd2pdcra");

  return dao.deleteCollection(collection);
})
