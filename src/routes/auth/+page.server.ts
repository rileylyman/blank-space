import { type RequestEvent, redirect, fail } from '@sveltejs/kit';
import { State } from '$lib/loginstate';

const redirectMe = async (event: RequestEvent) => {
    const cookies = event.request.headers.get('cookie')?.split(';');
    console.log(cookies);
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
    console.log(`redirecting to "${wantRedirect}"`)

    event.cookies.delete('wants_redirect', { path: '/auth'});
    redirect(302, wantRedirect);
}

export const actions = {
    login: async (event: RequestEvent) => {
        const form = await event.request.formData();
        const email = form.get('email')?.toString();
        const password = form.get('password')?.toString();

        let ret = {
            state: State.LogIn,
            email,
            errors: new Array<string>(),
        };
        
        if (!email || !password) {
            ret.errors.push("error: all fields must be filled out");
            return fail(400, ret);
        }


        try {
            await event.locals.pb.collection('users').authWithPassword(email, password);
        } catch (err) {
            ret.errors.push('error: incorrect email or password');
            return fail(400, ret);
        }

        await redirectMe(event);
    },
    register: async (event: RequestEvent) => {
        const form = await event.request.formData();
        const email = form.get('email')?.toString();
        const username = form.get('username')?.toString();
        const password = form.get('password')?.toString();
        const passwordConfirm = form.get('passwordConfirm')?.toString();
        let ret = {
            state: State.SignUp,
            email,
            username,
            errors: new Array<string>(),
        };

        if (!email || !username || !password || !passwordConfirm) {
            ret.errors.push("error: all fields must be filled out");
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

        redirect(302, '/auth/verify?stage=wait');
    },
    logout: async (event: RequestEvent) => {
        event.locals.pb.authStore.clear();
    },
    redirect_me: redirectMe,
}