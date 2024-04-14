/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tarz1503wkeorcs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fiwxyx9u",
    "name": "notes",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tarz1503wkeorcs")

  // remove
  collection.schema.removeField("fiwxyx9u")

  return dao.saveCollection(collection)
})
