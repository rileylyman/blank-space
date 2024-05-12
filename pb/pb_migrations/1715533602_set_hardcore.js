/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    db.newQuery(
      `
    update user_preferences
    set peacefulMode = false
    `,
    ).execute();
  },
  (db) => {
    // add down queries...
  },
);
