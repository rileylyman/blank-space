/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pth7hh9hclwp6no")

  collection.options = {
    "query": "with played_days_ago as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n),\nplayed_days_ago_with_rn as (\n  select \n      user,\n      days_ago,\n      (row_number() over(partition by user order by days_ago)) as rn\n    from played_days_ago\n),\nstreak_numbers as (\n  select \n      (row_number() over()) as id, \n      user,\n      days_ago,\n      rn,\n      (days_ago - rn + 1) as streak_number\n    from played_days_ago_with_rn\n),\nstreak_lengths as (\n  select distinct\n    user,\n    streak_number,\n    (count(streak_number) over(partition by user, streak_number)) as streak_length\n  from streak_numbers\n),\nmax_streaks as (\n  select\n    user,\n    max(streak_length) as max_streak\n  from streak_lengths\n  group by user\n),\ncurrent_streak as (\n  select\n    user,\n    min(streak_number) as streak_number,\n    streak_length as current_streak\n  from streak_lengths\n  where streak_number = 1 or streak_number = 0\n  group by user\n),\ntotal_games as (\n  select\n    user,\n    count(*) as total_games\n  from bs_game_progress\n  where won = 1 or lost = 1\n  group by user\n),\nwon_games as (\n  select\n    user,\n    count(*) as won_games\n  from bs_game_progress\n  where won = 1\n  group by user\n),\navg_scores as (\n  select user, avg(score) as avg_score\n  from bs_game_progress\n  where won = 1 or lost = 1\n  group by user\n),\nnum_guesses1 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 1\n  group by user, num_guesses\n),\nnum_guesses2 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 2\n  group by user, num_guesses\n),\nnum_guesses3 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 3\n  group by user, num_guesses\n),\nnum_guesses4 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 4\n  group by user, num_guesses\n),\nnum_guesses5 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 5\n  group by user, num_guesses\n)\nselect\n  (row_number() over()) as id,\n  users.id as user,\n  avg_score,\n  maxs.max_streak as max_streak,\n  currs.current_streak as current_streak,\n  tot.total_games,\n  won.won_games,\n  ng1.guess_distro as gd1,\n  ng2.guess_distro as gd2,\n  ng3.guess_distro as gd3,\n  ng4.guess_distro as gd4,\n  ng5.guess_distro as gd5\nfrom users\nleft join num_guesses1 ng1 on ng1.user = users.id\nleft join num_guesses2 ng2 on ng2.user = users.id\nleft join num_guesses3 ng3 on ng3.user = users.id\nleft join num_guesses4 ng4 on ng4.user = users.id\nleft join num_guesses5 ng5 on ng5.user = users.id\nleft join total_games tot on tot.user = users.id\nleft join current_streak currs on currs.user = users.id\nleft join max_streaks maxs on maxs.user = users.id\nleft join won_games won on won.user = users.id\nleft join avg_scores on avg_scores.user = users.id"
  }

  // remove
  collection.schema.removeField("h8nqh6qd")

  // remove
  collection.schema.removeField("cgy7qtds")

  // remove
  collection.schema.removeField("kngyt2re")

  // remove
  collection.schema.removeField("vucocgsc")

  // remove
  collection.schema.removeField("qwbm8cnn")

  // remove
  collection.schema.removeField("8kpu8vzh")

  // remove
  collection.schema.removeField("oudyq86v")

  // remove
  collection.schema.removeField("hdootqgy")

  // remove
  collection.schema.removeField("qxfx2iw0")

  // remove
  collection.schema.removeField("ubgjgwfm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "buy0qjtr",
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
    "id": "z3p0xrn2",
    "name": "avg_score",
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
    "id": "umim3c9r",
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
    "id": "6nkwh2sl",
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
    "id": "vxdgp1f9",
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
    "id": "428lmoeh",
    "name": "won_games",
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
    "id": "xzmu0ahm",
    "name": "gd1",
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
    "id": "ihmzgr43",
    "name": "gd2",
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
    "id": "tc6xtt0j",
    "name": "gd3",
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
    "id": "pk4eb2jc",
    "name": "gd4",
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
    "id": "eflwkikl",
    "name": "gd5",
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
    "query": "with played_days_ago as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n),\nplayed_days_ago_with_rn as (\n  select \n      user,\n      days_ago,\n      (row_number() over(partition by user order by days_ago)) as rn\n    from played_days_ago\n),\nstreak_numbers as (\n  select \n      (row_number() over()) as id, \n      user,\n      days_ago,\n      rn,\n      (days_ago - rn + 1) as streak_number\n    from played_days_ago_with_rn\n),\nstreak_lengths as (\n  select distinct\n    user,\n    streak_number,\n    (count(streak_number) over(partition by user, streak_number)) as streak_length\n  from streak_numbers\n),\nmax_streaks as (\n  select\n    user,\n    max(streak_length) as max_streak\n  from streak_lengths\n  group by user\n),\ncurrent_streak as (\n  select\n    user,\n    min(streak_number) as streak_number,\n    streak_length as current_streak\n  from streak_lengths\n  where streak_number = 1 or streak_number = 0\n  group by user\n),\ntotal_games as (\n  select\n    user,\n    count(*) as total_games\n  from bs_game_progress\n  where won = 1 or lost = 1\n  group by user\n),\nwon_games as (\n  select\n    user,\n    count(*) as won_games\n  from bs_game_progress\n  where won = 1\n  group by user\n),\nnum_guesses1 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 1\n  group by user, num_guesses\n),\nnum_guesses2 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 2\n  group by user, num_guesses\n),\nnum_guesses3 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 3\n  group by user, num_guesses\n),\nnum_guesses4 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 4\n  group by user, num_guesses\n),\nnum_guesses5 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 5\n  group by user, num_guesses\n)\nselect\n  (row_number() over()) as id,\n  users.id as user,\n  maxs.max_streak as max_streak,\n  currs.current_streak as current_streak,\n  tot.total_games,\n  won.won_games,\n  ng1.guess_distro as gd1,\n  ng2.guess_distro as gd2,\n  ng3.guess_distro as gd3,\n  ng4.guess_distro as gd4,\n  ng5.guess_distro as gd5\nfrom users\nleft join num_guesses1 ng1 on ng1.user = users.id\nleft join num_guesses2 ng2 on ng2.user = users.id\nleft join num_guesses3 ng3 on ng3.user = users.id\nleft join num_guesses4 ng4 on ng4.user = users.id\nleft join num_guesses5 ng5 on ng5.user = users.id\nleft join total_games tot on tot.user = users.id\nleft join current_streak currs on currs.user = users.id\nleft join max_streaks maxs on maxs.user = users.id\nleft join won_games won on won.user = users.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h8nqh6qd",
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
    "id": "cgy7qtds",
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
    "id": "kngyt2re",
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
    "id": "vucocgsc",
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
    "id": "qwbm8cnn",
    "name": "won_games",
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
    "id": "8kpu8vzh",
    "name": "gd1",
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
    "id": "oudyq86v",
    "name": "gd2",
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
    "id": "hdootqgy",
    "name": "gd3",
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
    "id": "qxfx2iw0",
    "name": "gd4",
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
    "id": "ubgjgwfm",
    "name": "gd5",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("buy0qjtr")

  // remove
  collection.schema.removeField("z3p0xrn2")

  // remove
  collection.schema.removeField("umim3c9r")

  // remove
  collection.schema.removeField("6nkwh2sl")

  // remove
  collection.schema.removeField("vxdgp1f9")

  // remove
  collection.schema.removeField("428lmoeh")

  // remove
  collection.schema.removeField("xzmu0ahm")

  // remove
  collection.schema.removeField("ihmzgr43")

  // remove
  collection.schema.removeField("tc6xtt0j")

  // remove
  collection.schema.removeField("pk4eb2jc")

  // remove
  collection.schema.removeField("eflwkikl")

  return dao.saveCollection(collection)
})
