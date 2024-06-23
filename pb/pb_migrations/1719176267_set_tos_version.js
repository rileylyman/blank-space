/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    db.newQuery(
      `
    update users
    set tosAndPrivacyVersion = 1
    `,
    ).execute();
  },
  (db) => {
    // add down queries...
  },
);

