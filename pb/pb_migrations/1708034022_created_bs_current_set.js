/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "k3g5i9pw1095702",
    "created": "2024-02-15 21:53:42.050Z",
    "updated": "2024-02-15 21:53:42.050Z",
    "name": "bs_current_set",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "u7n15ajx",
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
        "id": "jvivqies",
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
      "query": "select\n  id,\n  games,\n  max(publish_on) as publish_on\nfrom bs_game_sets\nwhere publish_on <= datetime('now')"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("k3g5i9pw1095702");

  return dao.deleteCollection(collection);
})
