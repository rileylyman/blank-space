/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tarz1503wkeorcs")

  collection.name = "bs_games"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tarz1503wkeorcs")

  collection.name = "blankspace"

  return dao.saveCollection(collection)
})
