
// src/lib/server/database.ts
export const db = {
    course: {
        findUnique: async ({ where }: any) => {
            // Simulace nalezení kurzu
            return { id: where.id, title: "Testovací kurz" };
        }
    },
    courseMaterial: {
        findMany: async ({ where }: any) => {
            // Simulace prázdného seznamu materiálů
            return [];
        }
    }
};
