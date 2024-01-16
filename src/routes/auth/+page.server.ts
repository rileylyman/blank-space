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
        const {
            email,
            password,
        } = Object.fromEntries(await event.request.formData());
        let ret = {
            state: State.LogIn,
            email,
        };

        try {
            await event.locals.pb.collection('users').authWithPassword(email, password);
        } catch (err) {
            ret.errors = [{ k: 'Error', v: 'incorrect email or password' }];
            return ret;
        }

        await redirectMe(event);
    },
    register: async (event: RequestEvent) => {
        const { 
            username, 
            email, 
            password, 
            passwordConfirm, 
        } = Object.fromEntries(await event.request.formData());
        let ret = {
            state: State.SignUp,
            email,
            username,
        };

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
        } catch (err) {
            ret.errors = [
                { k: 'Username', v: err.response.data.username?.message },
                { k: 'Email', v: err.response.data.email?.message },
                { k: 'Password', v: err.response.data.password?.message },
                { k: 'Password', v: err.response.data.passwordConfirm?.message },
            ]
            return fail(400, ret);
        }

        redirect(302, '/auth/verify?stage=wait');
    },
    logout: async (event: RequestEvent) => {
        event.locals.pb.authStore.clear();
    },
    redirect_me: redirectMe,
}