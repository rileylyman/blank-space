/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "m37hwzd34ul7612",
    "created": "2024-04-01 23:22:03.886Z",
    "updated": "2024-04-01 23:22:03.886Z",
    "name": "bs_last_week_scores",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wl2mnnv1",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
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
        "id": "cmmbcdgz",
        "name": "username",
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
        "id": "vcx58agj",
        "name": "total_score",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "cpvxokxb",
        "name": "games_played",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "eyfd02v0",
        "name": "total_games",
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
      "query": "with valid_dates as (\n  select publish_on as valid_date\n  from bs_game_sets\n  where date(publish_on) >= date(julianday('now') - (strftime('%w', 'now') + 7))\n    and date(publish_on) < date(julianday('now') - strftime('%w', 'now'))\n),\ntotal_games as (\n  select COUNT(*) * 4 as tot\n  from valid_dates\n)\nselect (ROW_NUMBER() OVER()) as id, bgp.user, users.username, sum(bgp.score) as total_score, count(*) as games_played, total_games.tot as total_games\nfrom bs_game_progress bgp\njoin users on users.id = bgp.user\njoin bs_game_sets bgs on bgs.id = bs_game_set\njoin valid_dates on bgs.publish_on = valid_date\njoin total_games\nwhere bgp.user != \"\"\ngroup by bgp.user"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("m37hwzd34ul7612");

  return dao.deleteCollection(collection);
})
