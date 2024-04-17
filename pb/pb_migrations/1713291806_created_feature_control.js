/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "g87i33y60kcgigh",
    "created": "2024-04-16 18:23:26.374Z",
    "updated": "2024-04-16 18:23:26.374Z",
    "name": "feature_control",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ny0yhfdh",
        "name": "name",
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
        "id": "amquvmje",
        "name": "filter",
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
        "id": "jbs16r4y",
        "name": "enabled",
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
  const collection = dao.findCollectionByNameOrId("g87i33y60kcgigh");

  return dao.deleteCollection(collection);
})
