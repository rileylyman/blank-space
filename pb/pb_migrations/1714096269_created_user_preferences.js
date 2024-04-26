/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "axaj03ac59d6ed0",
    "created": "2024-04-26 01:51:09.729Z",
    "updated": "2024-04-26 01:51:09.729Z",
    "name": "user_preferences",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9aexevvy",
        "name": "user",
        "type": "relation",
        "required": true,
        "presentable": true,
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
        "id": "bsfrvuyc",
        "name": "peacefulMode",
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
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("axaj03ac59d6ed0");

  return dao.deleteCollection(collection);
})
