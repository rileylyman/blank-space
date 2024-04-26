export const BS_HOME = "/games/blankspace";
export const BS_HOME_SKIP = "/games/blankspace?skip=true";
export const BS_HOME_SKIP_MENU = "/games/blankspace?skip=true&menu=true";
export const BS_STATS = "/games/blankspace/stats";
export const BS_RULES = "/games/blankspace/rules";
export const BS_RANKINGS = "/games/blankspace/rankings";
export const BS_PREV = "/games/blankspace/prev";
export const BS_FEEDBACK_LIST = "/games/blankspace/view";

export const AUTH_HOME = "/auth";
export const AUTH_VERIFY = "/auth/verify";
export const AUTH_REDIRECT_ME_ACTION = "/auth?/redirect_me";
export const AUTH_LOGOUT_ACTION = "/auth?/logout";
export const AUTH_LOGIN_ACTION = "/auth?/login";
export const AUTH_REGISTER_ACTION = "/auth?/register";

export const ACCOUNT = "/account";
export const ANNOUNCEMENTS = "/announcements";

export const announcementLink = (id: string) => `/announcements/${id}`;

export const bsGameLink = (setId: string, gameIdx: number, from: string) => `/games/blankspace/${setId}/${gameIdx}${from ? '?from=' + from : ''}`;
export const bsResultLink = (setId: string, gameIdx: number, from: string) => `${bsGameLink(setId, gameIdx, "")}/result${from ? '?from=' + from : ''}`;
export const bsFeedbackLink = 
    (setId: string, gameIdx: number, from: string) => `${bsGameLink(setId, gameIdx, "")}/feedback${from ? '?from=' + from : ''}`;

export const dictionaryWordApi = (word: string) => `/api/dictionary?word=${word}`;
export const blankspaceApi = (setId: string, gameId: string) =>
    `/api/blankspace?gameId=${gameId}&setId=${setId}`;
export const blankspaceApiGuess = (setId: string, gameId: string, guess: string, localDict: boolean) => 
    `/api/blankspace?gameId=${gameId}&setId=${setId}&guess=${guess}&localDict=${localDict}`;