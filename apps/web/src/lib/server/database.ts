// src/lib/server/database.ts

// DŮLEŽITÉ: Musí zde být slovo 'export', aby to ostatní soubory viděly!
export const db = {
    course: {
        findUnique: async ({ where }: any) => {
            return { id: where.id, title: "Testovací kurz" };
        }
    },
    courseMaterial: {
        findMany: async ({ where }: any) => {
            return [];
        }
    }
};
