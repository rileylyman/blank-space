/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "kqww6x3ev18wolq",
    "created": "2024-04-06 17:23:17.730Z",
    "updated": "2024-04-06 17:23:17.730Z",
    "name": "bs_this_week_sets",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6wfmegz8",
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
        "id": "ccixur2t",
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
      "query": "with valid_dates as (\n  select publish_on as valid_date\n  from bs_game_sets\n  where date(publish_on) >= date(julianday('now') - strftime('%w', 'now'))\n    and datetime(publish_on) <= datetime('now')\n)\nselect id, games, publish_on, created, updated\nfrom bs_game_sets\njoin valid_dates on publish_on = valid_date"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kqww6x3ev18wolq");

  return dao.deleteCollection(collection);
})
