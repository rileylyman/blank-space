import { type RequestEvent, redirect, fail } from '@sveltejs/kit';
import { State } from '$lib/loginstate';
import PocketBase from 'pocketbase';

export const actions = {
    login: async (event: RequestEvent) => {
        const form = await event.request.formData();
        const redirectTo = form.get('redirectTo');
        console.log(redirectTo);
        let state = State.LogIn;

        return {
            state,
            redirectTo,
        }
    },
    register: async (event: RequestEvent) => {
        const {username, email, password, passwordConfirm, redirectTo } = Object.fromEntries(await event.request.formData());
        console.log(email, password, passwordConfirm, redirectTo);
        let state = State.SignUp;

        const pb = new PocketBase('https://pb.slappygames.com');
        try {
            console.log("attempting to create");
            const user = await pb.collection('users').create({
                username,
                email,
                emailVisibility: false,
                password,
                passwordConfirm,
                verified: false,
            });
            console.log(user);
        } catch (err) {
            console.log(err.response);
            return fail(400, {
                state, 
                redirectTo,
                email,
                username,
                errors: [
                    { k: 'Username', v: err.response.data.username?.message },
                    { k: 'Email', v: err.response.data.email?.message },
                    { k: 'Password', v: err.response.data.password?.message },
                    { k: 'Password', v: err.response.data.passwordConfirm?.message },
                ]
            });
        }

        return {
            state,
            email,
            redirectTo,
        }
    },
}