/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    // delete game 149 and 111 from progresses first. And potentially everything before 3-10
    db.newQuery(
      `
    update bs_game_progress
    set bs_game_set = (
      select bs_game_sets.id
      from bs_game_sets
      where json_extract(bs_game_sets.games, '$') like '%' || bs_game_progress.bs_game || '%'
    )
    `,
    ).execute();
  },
  (db) => {
    // add down queries...
  },
);
