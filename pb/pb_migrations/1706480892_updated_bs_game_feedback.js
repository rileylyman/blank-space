/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2x3qzu8iqjens5m")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "user.id = @request.data.user.id"
  collection.updateRule = "user.id = @request.data.user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2x3qzu8iqjens5m")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
