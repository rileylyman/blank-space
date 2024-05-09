/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ey95w8ut1d1sw1v",
    "created": "2024-05-09 23:05:18.835Z",
    "updated": "2024-05-09 23:05:18.835Z",
    "name": "rules",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6owyuno1",
        "name": "text",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "5qemyajk",
        "name": "written_on",
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
  const collection = dao.findCollectionByNameOrId("ey95w8ut1d1sw1v");

  return dao.deleteCollection(collection);
})
