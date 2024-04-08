import { type RequestEvent, redirect, fail } from '@sveltejs/kit';
import { AUTH_VERIFY, AUTH_HOME } from '$lib/links.js';

const redirectMe = async (event: RequestEvent) => {
    const cookies = event.request.headers.get('cookie')?.split(';');
    let wantRedirect = '/';

    if (cookies) {
        for (let cookie of cookies) {
            const [key, value] = cookie.split('=');
            if (key.trim() === 'wants_redirect') {
                wantRedirect = decodeURIComponent(value.trim());
                break;
            }
        }
    }

    event.cookies.delete('wants_redirect', { path: AUTH_HOME});
    redirect(302, wantRedirect);
}

export const actions = {
    login: async (event: RequestEvent) => {
        const form = await event.request.formData();
        let emailOrUsername = form.get('email')?.toString();
        const password = form.get('password')?.toString();

        let ret = {
            state: "login",
            email: emailOrUsername,
            errors: new Array<string>(),
        };
        
        if (!emailOrUsername || !password) {
            ret.errors.push("error: all fields must be filled out");
            return fail(400, ret);
        }

        if (emailOrUsername.includes('@')) {
            // Usernames are case insensitive, but emails are not.
            emailOrUsername = emailOrUsername.toLocaleLowerCase();
        }

        try {
            await event.locals.pb.collection('users').authWithPassword(emailOrUsername, password);
        } catch (err) {
            ret.errors.push('error: incorrect email or password');
            return fail(400, ret);
        }

        await redirectMe(event);
    },
    register: async (event: RequestEvent) => {
        const form = await event.request.formData();
        const email = form.get('email')?.toString().toLocaleLowerCase();
        const emailConfirm = form.get('emailConfirm')?.toString().toLocaleLowerCase();
        const username = form.get('username')?.toString();
        const password = form.get('password')?.toString();
        const passwordConfirm = form.get('passwordConfirm')?.toString();
        let ret = {
            state: "signup",
            email,
            emailConfirm: "",
            username,
            errors: new Array<string>(),
        };

        if (!email || !emailConfirm || !username || !password || !passwordConfirm) {
            ret.errors.push("error: all fields must be filled out");
            return fail(400, ret);
        }

        if (email !== emailConfirm) {
            ret.errors.push("error: emails must match");
            return fail(400, ret);
        }

        try {
            await event.locals.pb.collection('users').create({
                username,
                email,
                emailVisibility: true,
                password,
                passwordConfirm,
                verified: false,
            });
            await event.locals.pb.collection('users').requestVerification(email);
            await event.locals.pb.collection('users').authWithPassword(email, password);
        } catch (err: any) {
            if (!('response' in err && 'data' in err.response)) {
                ret.errors.push("error: unknown error");
                return fail(400, ret);
            }
            const errorKeys = ['username', 'email', 'password', 'passwordConfirm'];
            for (let key of errorKeys) {
                if (err.response.data[key]) {
                    ret.errors.push(`${key}: ${err.response.data[key].message}`)
                }
            }
            return fail(400, ret);
        }

        redirect(302, `${AUTH_VERIFY}?email=${email}`);
    },
    logout: async (event: RequestEvent) => {
        event.locals.pb.authStore.clear();
        event.locals.wantsLogout = true;
    },
    redirect_me: redirectMe,
}