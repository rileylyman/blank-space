/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "pth7hh9hclwp6no",
    "created": "2024-02-15 22:11:20.509Z",
    "updated": "2024-02-15 22:11:20.509Z",
    "name": "bs_stats",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "roifl8gw",
        "name": "user",
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
        "id": "5wdu8khs",
        "name": "streak_number",
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
        "id": "ezkfxcwv",
        "name": "streak_length",
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
      "query": "with played_days_ago as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n),\nplayed_days_ago_with_rn as (\n  select \n      user,\n      days_ago,\n      (row_number() over(partition by user order by days_ago)) as rn\n    from played_days_ago\n),\nstreak_numbers as (\n  select \n      (row_number() over()) as id, \n      user,\n      days_ago,\n      rn,\n      (days_ago - rn + 1) as streak_number\n    from played_days_ago_with_rn\n),\nstreak_lengths as (\n  select distinct\n    user,\n    streak_number,\n    (count(streak_number) over(partition by user, streak_number)) as streak_length\n  from streak_numbers\n)\nselect\n  (row_number() over()) as id,\n  user,\n  streak_number,\n  streak_length\nfrom streak_lengths"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pth7hh9hclwp6no");

  return dao.deleteCollection(collection);
})
