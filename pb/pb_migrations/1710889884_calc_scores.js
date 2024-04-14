/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    db.newQuery(
      `
    update bs_game_progress
    set score = case 
      when lost = 1 then 0
      when length(guesses) - length(replace(guesses, ',', '')) = 0 then 25
      when length(guesses) - length(replace(guesses, ',', '')) = 1 then 22
      when length(guesses) - length(replace(guesses, ',', '')) = 2 then 14 
      when length(guesses) - length(replace(guesses, ',', '')) = 3 then 8
      when length(guesses) - length(replace(guesses, ',', '')) = 4 then 3 
    end
    where won = 1 or lost = 1
    `,
    ).execute();
  },
  (db) => {
    // add down queries...
  },
);
