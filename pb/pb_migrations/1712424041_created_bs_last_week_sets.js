/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "kbxij0xdn1yxq4c",
    "created": "2024-04-06 17:20:41.406Z",
    "updated": "2024-04-06 17:20:41.406Z",
    "name": "bs_last_week_sets",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lt7jpe8n",
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
        "id": "3tkcfx7b",
        "name": "publish_on",
        "type": "date",
        "required": false,
        "presentable": true,
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
    "options": {
      "query": "with valid_dates as (\n  select publish_on as valid_date\n  from bs_game_sets\n  where date(publish_on) >= date(julianday('now') - (strftime('%w', 'now') + 7))\n    and date(publish_on) < date(julianday('now') - strftime('%w', 'now'))\n)\nselect id, games, publish_on, created, updated\nfrom bs_game_sets\njoin valid_dates on publish_on = valid_date"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kbxij0xdn1yxq4c");

  return dao.deleteCollection(collection);
})
