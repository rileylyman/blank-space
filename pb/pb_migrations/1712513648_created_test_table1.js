/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "nqf5nuyww7cm1vs",
    "created": "2024-04-07 18:14:08.763Z",
    "updated": "2024-04-07 18:14:08.763Z",
    "name": "test_table1",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yvd3cqnw",
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
      "query": "select id, pst_now from test_table"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("nqf5nuyww7cm1vs");

  return dao.deleteCollection(collection);
})
