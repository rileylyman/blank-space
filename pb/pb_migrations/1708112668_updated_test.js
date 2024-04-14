/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7xuigi5s2bjc5tm")

  collection.options = {
    "query": "with played_days_ago as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n),\nplayed_days_ago_with_rn as (\n  select \n      user,\n      days_ago,\n      (row_number() over(partition by user order by days_ago)) as rn\n    from played_days_ago\n),\nstreak_numbers as (\n  select \n      (row_number() over()) as id, \n      user,\n      days_ago,\n      rn,\n      (days_ago - rn + 1) as streak_number\n    from played_days_ago_with_rn\n),\nstreak_lengths as (\n  select distinct\n    user,\n    streak_number,\n    (count(streak_number) over(partition by user, streak_number)) as streak_length\n  from streak_numbers\n),\nmax_streaks as (\n  select\n    user,\n    max(streak_length) as max_streak\n  from streak_lengths\n  group by user\n),\ncurrent_streak as (\n  select\n    user,\n    min(streak_number) as streak_number,\n    streak_length as current_streak\n  from streak_lengths\n  where streak_number = 1 or streak_number = 0\n  group by user\n),\ntotal_games as (\n  select\n    user,\n    count(*) as total_games\n  from bs_game_progress\n  where won = 1 or lost = 1\n  group by user\n),\nwon_games as (\n  select\n    user,\n    count(*) as won_games\n  from bs_game_progress\n  where won = 1\n  group by user\n),\nnum_guesses1 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 1\n  group by user, num_guesses\n),\nnum_guesses2 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 2\n  group by user, num_guesses\n),\nnum_guesses3 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 3\n  group by user, num_guesses\n),\nnum_guesses4 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 4\n  group by user, num_guesses\n),\nnum_guesses5 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 5\n  group by user, num_guesses\n)\nselect\n  (row_number() over()) as id, \n      user,\n      days_ago,\n      rn,\n      streak_number\nfrom streak_numbers"
  }

  // remove
  collection.schema.removeField("xibuiwr3")

  // remove
  collection.schema.removeField("zaxqrcgb")

  // remove
  collection.schema.removeField("h4js3kek")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n15kmfqj",
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
    "id": "i7keqput",
    "name": "days_ago",
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
    "id": "dvzsi6eg",
    "name": "rn",
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
    "id": "4fzmiize",
    "name": "streak_number",
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
  const collection = dao.findCollectionByNameOrId("7xuigi5s2bjc5tm")

  collection.options = {
    "query": "with played_days_ago as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n),\nplayed_days_ago_with_rn as (\n  select \n      user,\n      days_ago,\n      (row_number() over(partition by user order by days_ago)) as rn\n    from played_days_ago\n),\nstreak_numbers as (\n  select \n      (row_number() over()) as id, \n      user,\n      days_ago,\n      rn,\n      (days_ago - rn + 1) as streak_number\n    from played_days_ago_with_rn\n),\nstreak_lengths as (\n  select distinct\n    user,\n    streak_number,\n    (count(streak_number) over(partition by user, streak_number)) as streak_length\n  from streak_numbers\n),\nmax_streaks as (\n  select\n    user,\n    max(streak_length) as max_streak\n  from streak_lengths\n  group by user\n),\ncurrent_streak as (\n  select\n    user,\n    min(streak_number) as streak_number,\n    streak_length as current_streak\n  from streak_lengths\n  where streak_number = 1 or streak_number = 0\n  group by user\n),\ntotal_games as (\n  select\n    user,\n    count(*) as total_games\n  from bs_game_progress\n  where won = 1 or lost = 1\n  group by user\n),\nwon_games as (\n  select\n    user,\n    count(*) as won_games\n  from bs_game_progress\n  where won = 1\n  group by user\n),\nnum_guesses1 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 1\n  group by user, num_guesses\n),\nnum_guesses2 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 2\n  group by user, num_guesses\n),\nnum_guesses3 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 3\n  group by user, num_guesses\n),\nnum_guesses4 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 4\n  group by user, num_guesses\n),\nnum_guesses5 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 5\n  group by user, num_guesses\n)\nselect\n  (row_number() over()) as id,\n  user,\n  streak_number,\n  streak_length\nfrom streak_lengths"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xibuiwr3",
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
    "id": "zaxqrcgb",
    "name": "streak_number",
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
    "id": "h4js3kek",
    "name": "streak_length",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("n15kmfqj")

  // remove
  collection.schema.removeField("i7keqput")

  // remove
  collection.schema.removeField("dvzsi6eg")

  // remove
  collection.schema.removeField("4fzmiize")

  return dao.saveCollection(collection)
})
