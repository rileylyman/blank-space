import { BS_HOME } from "$lib/links";
import { redirect } from "@sveltejs/kit";

export const load = () => {
    redirect(302, BS_HOME);
}