/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8pgo9tova79oac")

  collection.name = "bs_vetting_progress"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8pgo9tova79oac")

  collection.name = "bs_phrase_vetting_progress"

  return dao.saveCollection(collection)
})
