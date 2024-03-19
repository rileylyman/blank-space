export const BS_HOME = "/games/blankspace";
export const BS_HOME_SKIP = "/games/blankspace?skip=true";
export const BS_GAME_LIST = "/games/blankspace/list";
export const BS_FEEDBACK_LIST = "/games/blankspace/view";

export const AUTH_HOME = "/auth";
export const AUTH_VERIFY = "/auth/verify";
export const AUTH_REDIRECT_ME_ACTION = "/auth?/redirect_me";
export const AUTH_LOGOUT_ACTION = "/auth?/logout";
export const AUTH_LOGIN_ACTION = "/auth?/login";
export const AUTH_REGISTER_ACTION = "/auth?/register";

export const bsGameLink = (setId: string, gameIdx: number) => `/games/blankspace/${setId}/${gameIdx}`;
export const bsResultLink = (setId: string, gameIdx: number) => `${bsGameLink(setId, gameIdx)}/result`;
export const bsFeedbackLink = 
    (setId: string, gameIdx: number, from: string = "") => `${bsGameLink(setId, gameIdx)}/feedback${from ? '?from=' + from : ''}`;

export const dictionaryWordApi = (word: string) => `/api/dictionary?word=${word}`;
export const blankspaceApi = (setId: string, gameId: string) =>
    `/api/blankspace?gameId=${gameId}&setId=${setId}`;
export const blankspaceApiGuess = (setId: string, gameId: string, guess: string) => 
    `/api/blankspace?gameId=${gameId}&setId=${setId}&guess=${guess}`;