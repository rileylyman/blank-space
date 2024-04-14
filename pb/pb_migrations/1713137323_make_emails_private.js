/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    db.newQuery(
      `
    update users set emailVisibility = false
    `,
    ).execute();
  },
  (db) => {
    // add down queries...
  },
);
