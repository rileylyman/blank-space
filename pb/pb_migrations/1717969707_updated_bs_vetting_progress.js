/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8pgo9tova79oac")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "user.id = @request.auth.id"
  collection.updateRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g8pgo9tova79oac")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
