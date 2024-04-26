import { getUserPreferences, setUserPreferences } from '$lib/utils.js';
import { type RequestEvent, type ServerLoadEvent } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {
    return {
        prefs: await getUserPreferences(event.locals.pb),
    }
}

export const actions = {
    logout: async (event: RequestEvent) => {
        event.locals.pb.authStore.clear();
        event.locals.wantsLogout = true;
    },
    prefs: async (event: RequestEvent) => {
        let form = await event.request.formData();

        let prefs = await getUserPreferences(event.locals.pb);
        prefs.peacefulMode = form.get("peacefulMode") === "on";
        setUserPreferences(event.locals.pb, prefs);
        return {
            prefs
        };
    }
}