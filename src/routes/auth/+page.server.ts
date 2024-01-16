import { type RequestEvent, redirect, fail } from '@sveltejs/kit';
import { State } from '$lib/loginstate';
import PocketBase from 'pocketbase';

export const actions = {
    login: async (event: RequestEvent) => {
        const form = await event.request.formData();
        let state = State.LogIn;

        return {
            state,
        }
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
    redirect_me: async (event: RequestEvent) => {
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

        redirect(302, wantRedirect);
    }
}