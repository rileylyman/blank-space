/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3ebmv4ygluk5vm7")

  collection.createRule = "@request.auth.id = user.id"
  collection.updateRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3ebmv4ygluk5vm7")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})