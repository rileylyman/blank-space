/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pth7hh9hclwp6no")

  collection.options = {
    "query": "with played_days_ago as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n),\nplayed_days_ago_with_rn as (\n  select \n      user,\n      days_ago,\n      (row_number() over(partition by user order by days_ago)) as rn\n    from played_days_ago\n),\nstreak_numbers as (\n  select \n      (row_number() over()) as id, \n      user,\n      days_ago,\n      rn,\n      (days_ago - rn + 1) as streak_number\n    from played_days_ago_with_rn\n),\nstreak_lengths as (\n  select distinct\n    user,\n    streak_number,\n    (count(streak_number) over(partition by user, streak_number)) as streak_length\n  from streak_numbers\n),\nmax_streaks as (\n  select\n    user,\n    max(streak_length) as max_streak\n  from streak_lengths\n  group by user\n),\ncurrent_streak as (\n  select\n    user,\n    min(streak_number) as streak_number,\n    streak_length as current_streak\n  from streak_lengths\n  where streak_number = 1 or streak_number = 0\n  group by user\n),\ntotal_games as (\n  select\n    user,\n    count(*) as total_games\n  from bs_game_progress\n  where (won = 1 or lost = 1)\n  group by user\n),\nwon_games as (\n  select\n    user,\n    count(*) as won_games\n  from bs_game_progress\n  where won = 1\n  group by user\n)\nselect\n  (row_number() over()) as id,\n  users.id as user,\n  maxs.max_streak as max_streak,\n  currs.current_streak as current_streak,\n  tot.total_games,\n  won.won_games\nfrom users\nleft join total_games tot on tot.user = users.id\nleft join current_streak currs on currs.user = users.id\nleft join max_streaks maxs on maxs.user = users.id\nleft join won_games won on won.user = users.id"
  }

  // remove
  collection.schema.removeField("zorigghu")

  // remove
  collection.schema.removeField("bnu0yqkp")

  // remove
  collection.schema.removeField("ynuijd9h")

  // remove
  collection.schema.removeField("qn4np7rm")

  // remove
  collection.schema.removeField("aoc8qwvt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eqh9qqcv",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sqndzgqq",
    "name": "max_streak",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h9afcaft",
    "name": "current_streak",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h9hcpvqm",
    "name": "total_games",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iuwsotwn",
    "name": "won_games",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pth7hh9hclwp6no")

  collection.options = {
    "query": "with played_days_ago as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n),\nplayed_days_ago_with_rn as (\n  select \n      user,\n      days_ago,\n      (row_number() over(partition by user order by days_ago)) as rn\n    from played_days_ago\n),\nstreak_numbers as (\n  select \n      (row_number() over()) as id, \n      user,\n      days_ago,\n      rn,\n      (days_ago - rn + 1) as streak_number\n    from played_days_ago_with_rn\n),\nstreak_lengths as (\n  select distinct\n    user,\n    streak_number,\n    (count(streak_number) over(partition by user, streak_number)) as streak_length\n  from streak_numbers\n),\nmax_streaks as (\n  select\n    user,\n    max(streak_length) as max_streak\n  from streak_lengths\n  group by user\n),\ncurrent_streak as (\n  select\n    user,\n    min(streak_number) as streak_number,\n    streak_length as current_streak\n  from streak_lengths\n  where streak_number = 1 or streak_number = 0\n  group by user\n),\ntotal_games as (\n  select\n    user,\n    count(*) as total_games\n  from bs_game_progress\n  where (won = 1 or lost = 1)\n  group by user\n),\nwon_games as (\n  select\n    user,\n    count(*) as won_games\n  from bs_game_progress\n  where won = 1\n  group by user\n)\nselect\n  (row_number() over()) as id,\n  tot.user as user,\n  maxs.max_streak as max_streak,\n  currs.current_streak as current_streak,\n  tot.total_games,\n  won.won_games\nfrom total_games tot\nleft join current_streak as currs on currs.user = tot.user\nleft join max_streaks maxs on maxs.user = tot.user\nleft join won_games won on won.user = tot.user"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zorigghu",
    "name": "user",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bnu0yqkp",
    "name": "max_streak",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ynuijd9h",
    "name": "current_streak",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qn4np7rm",
    "name": "total_games",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aoc8qwvt",
    "name": "won_games",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("eqh9qqcv")

  // remove
  collection.schema.removeField("sqndzgqq")

  // remove
  collection.schema.removeField("h9afcaft")

  // remove
  collection.schema.removeField("h9hcpvqm")

  // remove
  collection.schema.removeField("iuwsotwn")

  return dao.saveCollection(collection)
})
