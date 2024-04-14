/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6qfwti2pc56l90a");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "6qfwti2pc56l90a",
    "created": "2024-04-14 23:23:33.148Z",
    "updated": "2024-04-14 23:23:33.148Z",
    "name": "test",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "alipa6ak",
        "name": "hey",
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
      "query": "select 1 as id, \"hey\" as hey"
    }
  });

  return Dao(db).saveCollection(collection);
})
