import { type RequestEvent } from '@sveltejs/kit';

export const actions = {
    reset: async (event: RequestEvent) => {
        const form = await event.request.formData();
        const email = form.get('email')?.toString() ?? "";

        try {
            await event.locals.pb.collection('users').requestPasswordReset(email);
        } catch (e) {
            return { 
                email,
                error: true,
            }
        }

        return {
            email,
        }
    }
}