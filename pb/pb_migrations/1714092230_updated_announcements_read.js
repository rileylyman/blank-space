/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3ebmv4ygluk5vm7")

  collection.listRule = "@request.auth.id = user.id"
  collection.viewRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3ebmv4ygluk5vm7")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
