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

export const bsGameLink = (gameId: string) => `/games/blankspace/${gameId}`;

export const dictionaryWordApi = (word: string) => `/api/dictionary?word=${word}`;
export const blankspaceApi = (gameId: string) => `/api/blankspace?gameId=${gameId}`;
export const blankspaceApiGuess = (gameId: string, guess: string) => 
    `/api/blankspace?gameId=${gameId}&guess=${guess}`;