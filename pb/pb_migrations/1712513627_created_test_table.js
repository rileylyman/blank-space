/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3scxbo9s722gcmh",
    "created": "2024-04-07 18:13:47.540Z",
    "updated": "2024-04-07 18:13:47.540Z",
    "name": "test_table",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "beb1o4ri",
        "name": "pst_now",
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
      "query": "select 0 as id, datetime('now', '-7 hours') as pst_now"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3scxbo9s722gcmh");

  return dao.deleteCollection(collection);
})
