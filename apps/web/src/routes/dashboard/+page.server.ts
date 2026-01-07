import { db } from '$lib/server/database';
import { fail, error } from '@sveltejs/kit'; // přidán import error
import { v4 as uuidv4 } from 'uuid';

export const load = async ({ params }) => {
    // 1. Ochrana: Pokud params.id vůbec neexistuje, vyhodíme 404 hned
    if (!params.id) {
        throw error(404, 'ID kurzu nebylo zadáno');
    }

    try {
        // 2. Hledáme kurz podle ID
        const course = await db.course.findUnique({ where: { uuid: params.id } });
        
        // 3. Pokud kurz v DB není, vyhodíme 404 (místo aby to spadlo na další řádce)
        if (!course) {
            throw error(404, 'Kurz nebyl nalezen');
        }

        // 4. Hledáme materiály
        const materials = await db.material.findMany({ where: { course_uuid: params.id } });
        
        return { course, materials };
    } catch (err: any) {
        // Pokud už je to naše hozená chyba 404, pošleme ji dál
        if (err.status) throw err;
        
        console.error("Chyba při načítání dashboardu:", err);
        throw error(500, 'Interní chyba serveru');
    }
};

export const actions = {
    // ... tvoje akce uploadFile a uploadLink zůstávají stejné
};