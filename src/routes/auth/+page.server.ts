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
        const { 
            username, 
            email, 
            password, 
            passwordConfirm, 
            redirectTo 
        } = Object.fromEntries(await event.request.formData());
        let ret = {
            state: State.SignUp,
            redirectTo,
            email,
            username,
        };

        const pb = new PocketBase('https://pb.slappygames.com');
        try {
            await pb.collection('users').create({
                username,
                email,
                emailVisibility: false,
                password,
                passwordConfirm,
                verified: false,
            });
            await pb.collection('users').requestVerification(email);
        } catch (err) {
            ret.errors = [
                { k: 'Username', v: err.response.data.username?.message },
                { k: 'Email', v: err.response.data.email?.message },
                { k: 'Password', v: err.response.data.password?.message },
                { k: 'Password', v: err.response.data.passwordConfirm?.message },
            ]
            return fail(400, ret);
        }

        const redirectLink = redirectTo ? `&redirectTo=${redirectTo}` : '';
        redirect(302, `/auth/verify?stage=wait&email=${email}${redirectLink}`)
    },
}