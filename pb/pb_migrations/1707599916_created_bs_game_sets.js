/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "art2fab3pwic9go",
    "created": "2024-02-10 21:18:36.490Z",
    "updated": "2024-02-10 21:18:36.490Z",
    "name": "bs_game_sets",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wnrakume",
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
        "id": "pju437tr",
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
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("art2fab3pwic9go");

  return dao.deleteCollection(collection);
})
