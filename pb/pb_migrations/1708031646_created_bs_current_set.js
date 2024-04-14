/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ieafwerbaq1p5k6",
    "created": "2024-02-15 21:14:06.546Z",
    "updated": "2024-02-15 21:14:06.546Z",
    "name": "bs_current_set",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hipvdsqx",
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
      },
      {
        "system": false,
        "id": "kp49pw91",
        "name": "publish_on",
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
      "query": "select\n  id,\n  games,\n  MAX(publish_on) as publish_on\nfrom bs_game_sets"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ieafwerbaq1p5k6");

  return dao.deleteCollection(collection);
})
