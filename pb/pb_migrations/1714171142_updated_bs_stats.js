/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pth7hh9hclwp6no")

  collection.options = {
    "query": "with num_guesses1 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 1 and (won = true or lost = true)\n  group by user, num_guesses\n),\nnum_guesses2 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 2 and (won = true or lost = true)\n  group by user, num_guesses\n),\nnum_guesses3 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 3 and (won = true or lost = true)\n  group by user, num_guesses\n),\nnum_guesses4 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 4 and (won = true or lost = true)\n  group by user, num_guesses\n),\nnum_guesses5 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 5 and (won = true or lost = true)\n  group by user, num_guesses\n)\nselect\n  (row_number() over()) as id,\n  users.id as user,\n  avg(bgp.score) as avg_score,\n  count(*) as total_games,\n  sum(bgp.won) as won_games,\n  ng1.guess_distro as gd1,\n  ng2.guess_distro as gd2,\n  ng3.guess_distro as gd3,\n  ng4.guess_distro as gd4,\n  ng5.guess_distro as gd5\nfrom bs_game_progress bgp\njoin users on users.id = bgp.user\nleft join num_guesses1 ng1 on ng1.user = users.id\nleft join num_guesses2 ng2 on ng2.user = users.id\nleft join num_guesses3 ng3 on ng3.user = users.id\nleft join num_guesses4 ng4 on ng4.user = users.id\nleft join num_guesses5 ng5 on ng5.user = users.id\nwhere bgp.won = 1 or bgp.lost = 1\ngroup by bgp.user"
  }

  // remove
  collection.schema.removeField("k0jpdtp0")

  // remove
  collection.schema.removeField("kruetoqg")

  // remove
  collection.schema.removeField("alyt3pmb")

  // remove
  collection.schema.removeField("xgvmz05h")

  // remove
  collection.schema.removeField("ojtzpamb")

  // remove
  collection.schema.removeField("dk9povme")

  // remove
  collection.schema.removeField("pno9dczo")

  // remove
  collection.schema.removeField("nk6d14ji")

  // remove
  collection.schema.removeField("goptq5me")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vujgwrez",
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
    "id": "g3fnwdgw",
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
    "id": "gawqwhzt",
    "name": "total_games",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "twbqqwui",
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
    "id": "jr71jmin",
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
    "id": "f286rhk7",
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
    "id": "db77men6",
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
    "id": "yjrkr8l8",
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
    "id": "dpfcpklw",
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
    "query": "with num_guesses1 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 1\n  group by user, num_guesses\n),\nnum_guesses2 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 2\n  group by user, num_guesses\n),\nnum_guesses3 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 3\n  group by user, num_guesses\n),\nnum_guesses4 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 4\n  group by user, num_guesses\n),\nnum_guesses5 as (\n  select\n    user,\n    length(guesses) - length(replace(guesses, ',', '')) + 1 as num_guesses,\n    count(*) as guess_distro\n  from bs_game_progress\n  where num_guesses = 5\n  group by user, num_guesses\n)\nselect\n  (row_number() over()) as id,\n  users.id as user,\n  avg(bgp.score) as avg_score,\n  count(*) as total_games,\n  sum(bgp.won) as won_games,\n  ng1.guess_distro as gd1,\n  ng2.guess_distro as gd2,\n  ng3.guess_distro as gd3,\n  ng4.guess_distro as gd4,\n  ng5.guess_distro as gd5\nfrom bs_game_progress bgp\njoin users on users.id = bgp.user\nleft join num_guesses1 ng1 on ng1.user = users.id\nleft join num_guesses2 ng2 on ng2.user = users.id\nleft join num_guesses3 ng3 on ng3.user = users.id\nleft join num_guesses4 ng4 on ng4.user = users.id\nleft join num_guesses5 ng5 on ng5.user = users.id\nwhere bgp.won = 1 or bgp.lost = 1\ngroup by bgp.user"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k0jpdtp0",
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
    "id": "kruetoqg",
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
    "id": "alyt3pmb",
    "name": "total_games",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xgvmz05h",
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
    "id": "ojtzpamb",
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
    "id": "dk9povme",
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
    "id": "pno9dczo",
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
    "id": "nk6d14ji",
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
    "id": "goptq5me",
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
  collection.schema.removeField("vujgwrez")

  // remove
  collection.schema.removeField("g3fnwdgw")

  // remove
  collection.schema.removeField("gawqwhzt")

  // remove
  collection.schema.removeField("twbqqwui")

  // remove
  collection.schema.removeField("jr71jmin")

  // remove
  collection.schema.removeField("f286rhk7")

  // remove
  collection.schema.removeField("db77men6")

  // remove
  collection.schema.removeField("yjrkr8l8")

  // remove
  collection.schema.removeField("dpfcpklw")

  return dao.saveCollection(collection)
})
