
// src/lib/server/database.ts

// Simulované úložiště dat v paměti
let materials: any[] = [];

export const db = {
    course: {
        findUnique: async ({ where }: any) => {
            return { id: where.id, title: "Testovací kurz" };
        }
    },
    courseMaterial: {
        findMany: async ({ where }: any) => {
            // Filtrujeme materiály podle ID kurzu
            return materials.filter(m => m.courseId === where.courseId);
        },
        // TATO ČÁST CHYBĚLA A ZPŮSOBOVALA CHYBU 500
        create: async ({ data }: any) => {
            const newMaterial = { 
                ...data, 
                id: Math.random().toString(36).substring(7) 
            };
            materials.push(newMaterial);
            return newMaterial;
        }
    }
};
