import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        // Testovací údaje ze zadání
        if (username === 'lecturer' && password === 'TdA26!') {
            cookies.set('session', 'logged-in-lecturer', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 den
            });

            throw redirect(303, '/dashboard');
        }

        return fail(400, { error: 'Nesprávné jméno nebo heslo' });
    }
};