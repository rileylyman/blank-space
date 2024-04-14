/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pth7hh9hclwp6no")

  collection.options = {
    "query": "with played_days_ago as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n),\nplayed_days_ago_with_rn as (\n  select \n      user,\n      days_ago,\n      (row_number() over(partition by user order by days_ago)) as rn\n    from played_days_ago\n),\nstreak_numbers as (\n  select \n      (row_number() over()) as id, \n      user,\n      days_ago,\n      rn,\n      (days_ago - rn + 1) as streak_number\n    from played_days_ago_with_rn\n),\nstreak_lengths as (\n  select distinct\n    user,\n    streak_number,\n    (count(streak_number) over(partition by user, streak_number)) as streak_length\n  from streak_numbers\n),\nmax_streaks as (\n  select\n    user,\n    max(streak_length) as max_streak\n  from streak_lengths\n  group by user\n),\ncurrent_streak as (\n  select\n    user,\n    min(streak_number) as streak_number,\n    streak_length as current_streak\n  from streak_lengths\n  where streak_number = 1 or streak_number = 0\n  group by user\n),\ntotal_games as (\n  select\n    user,\n    count(*) as total_games\n  from bs_game_progress\n  where won = 1 or lost = 1\n  group by user\n),\nwon_games as (\n  select\n    user,\n    count(*) as won_games\n  from bs_game_progress\n  where won = 1\n  group by user\n),\nnum_guesses1 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 1\n  group by user, num_guesses\n),\nnum_guesses2 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 2\n  group by user, num_guesses\n),\nnum_guesses3 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 3\n  group by user, num_guesses\n),\nnum_guesses4 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 4\n  group by user, num_guesses\n),\nnum_guesses5 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 5\n  group by user, num_guesses\n)\nselect\n  (row_number() over()) as id,\n  users.id as user,\n  maxs.max_streak as max_streak,\n  currs.current_streak as current_streak,\n  tot.total_games,\n  won.won_games,\n  ng1.user as gd1_user,\n  ng2.user as gd2_user,\n  ng1.guess_distro as gd1,\n  ng2.guess_distro as gd2,\n  ng3.guess_distro as gd3,\n  ng4.guess_distro as gd4,\n  ng5.guess_distro as gd5\nfrom users\nleft join num_guesses1 ng1 on ng1.user = users.id\nleft join num_guesses2 ng2 on ng1.user = users.id\nleft join num_guesses3 ng3 on ng1.user = users.id\nleft join num_guesses4 ng4 on ng1.user = users.id\nleft join num_guesses5 ng5 on ng1.user = users.id\nleft join total_games tot on tot.user = users.id\nleft join current_streak currs on currs.user = users.id\nleft join max_streaks maxs on maxs.user = users.id\nleft join won_games won on won.user = users.id"
  }

  // remove
  collection.schema.removeField("izacn5cu")

  // remove
  collection.schema.removeField("9e4hvnbe")

  // remove
  collection.schema.removeField("edcgbl15")

  // remove
  collection.schema.removeField("xrwqebya")

  // remove
  collection.schema.removeField("ge6fuuef")

  // remove
  collection.schema.removeField("lmqrt6tr")

  // remove
  collection.schema.removeField("haxary4r")

  // remove
  collection.schema.removeField("ugdmgsoh")

  // remove
  collection.schema.removeField("8h5sshuw")

  // remove
  collection.schema.removeField("v1u1lxvr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fotjtnja",
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
    "id": "sjv3dcxr",
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
    "id": "gjtbdh27",
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
    "id": "hfh8xspl",
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
    "id": "ztmfiejd",
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
    "id": "3yebritj",
    "name": "gd1_user",
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
    "id": "92qtpfyl",
    "name": "gd2_user",
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
    "id": "tbnnia5f",
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
    "id": "qyknfzsj",
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
    "id": "o0dmqnpo",
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
    "id": "dql9ddsq",
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
    "id": "ug3wba8s",
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
    "query": "with played_days_ago as (\n  select distinct \n      bgp.user,\n      cast(julianday('now') - julianday(bgs.publish_on) as int) as days_ago\n    from bs_game_progress bgp\n    join bs_game_sets bgs \n        on json_extract(bgs.games, '$') like '%' || bgp.bs_game || '%'\n    where julianday(bgs.publish_on) <= julianday('now')\n),\nplayed_days_ago_with_rn as (\n  select \n      user,\n      days_ago,\n      (row_number() over(partition by user order by days_ago)) as rn\n    from played_days_ago\n),\nstreak_numbers as (\n  select \n      (row_number() over()) as id, \n      user,\n      days_ago,\n      rn,\n      (days_ago - rn + 1) as streak_number\n    from played_days_ago_with_rn\n),\nstreak_lengths as (\n  select distinct\n    user,\n    streak_number,\n    (count(streak_number) over(partition by user, streak_number)) as streak_length\n  from streak_numbers\n),\nmax_streaks as (\n  select\n    user,\n    max(streak_length) as max_streak\n  from streak_lengths\n  group by user\n),\ncurrent_streak as (\n  select\n    user,\n    min(streak_number) as streak_number,\n    streak_length as current_streak\n  from streak_lengths\n  where streak_number = 1 or streak_number = 0\n  group by user\n),\ntotal_games as (\n  select\n    user,\n    count(*) as total_games\n  from bs_game_progress\n  where won = 1 or lost = 1\n  group by user\n),\nwon_games as (\n  select\n    user,\n    count(*) as won_games\n  from bs_game_progress\n  where won = 1\n  group by user\n),\nnum_guesses1 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 1\n  group by user, num_guesses\n),\nnum_guesses2 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 2\n  group by user, num_guesses\n),\nnum_guesses3 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 3\n  group by user, num_guesses\n),\nnum_guesses4 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 4\n  group by user, num_guesses\n),\nnum_guesses5 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 5\n  group by user, num_guesses\n)\nselect\n  (row_number() over()) as id,\n  users.id as user,\n  maxs.max_streak as max_streak,\n  currs.current_streak as current_streak,\n  tot.total_games,\n  won.won_games,\n  ng1.guess_distro as gd1,\n  ng2.guess_distro as gd2,\n  ng3.guess_distro as gd3,\n  ng4.guess_distro as gd4,\n  ng5.guess_distro as gd5\nfrom users\nleft join num_guesses1 ng1 on ng1.user = users.id\nleft join num_guesses2 ng2 on ng1.user = users.id\nleft join num_guesses3 ng3 on ng1.user = users.id\nleft join num_guesses4 ng4 on ng1.user = users.id\nleft join num_guesses5 ng5 on ng1.user = users.id\nleft join total_games tot on tot.user = users.id\nleft join current_streak currs on currs.user = users.id\nleft join max_streaks maxs on maxs.user = users.id\nleft join won_games won on won.user = users.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "izacn5cu",
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
    "id": "9e4hvnbe",
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
    "id": "edcgbl15",
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
    "id": "xrwqebya",
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
    "id": "ge6fuuef",
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
    "id": "lmqrt6tr",
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
    "id": "haxary4r",
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
    "id": "ugdmgsoh",
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
    "id": "8h5sshuw",
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
    "id": "v1u1lxvr",
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
  collection.schema.removeField("fotjtnja")

  // remove
  collection.schema.removeField("sjv3dcxr")

  // remove
  collection.schema.removeField("gjtbdh27")

  // remove
  collection.schema.removeField("hfh8xspl")

  // remove
  collection.schema.removeField("ztmfiejd")

  // remove
  collection.schema.removeField("3yebritj")

  // remove
  collection.schema.removeField("92qtpfyl")

  // remove
  collection.schema.removeField("tbnnia5f")

  // remove
  collection.schema.removeField("qyknfzsj")

  // remove
  collection.schema.removeField("o0dmqnpo")

  // remove
  collection.schema.removeField("dql9ddsq")

  // remove
  collection.schema.removeField("ug3wba8s")

  return dao.saveCollection(collection)
})
