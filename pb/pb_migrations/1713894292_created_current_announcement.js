/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qwzp3rl5mgfwiag",
    "created": "2024-04-23 17:44:52.152Z",
    "updated": "2024-04-23 17:44:52.152Z",
    "name": "current_announcement",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "k1qizdni",
        "name": "title",
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
        "id": "8bclwnfv",
        "name": "message",
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
        "id": "n27kt7bd",
        "name": "release_on",
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
      "query": "select id, title, message, max(release_on) as release_on, created, updated\nfrom announcements\nwhere datetime(release_on) <= datetime('now')"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qwzp3rl5mgfwiag");

  return dao.deleteCollection(collection);
})
