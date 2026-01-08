// Simulované úložiště v paměti
let materials: any[] = [];
let courses: any[] = [
    { id: '1', name: 'Testovací kurz', description: 'Popis kurzu' }
];

export const db = {
    course: {
        findUnique: async ({ where, include }: any) => {
            const course = courses.find(c => c.id === where.id);
            if (!course) return null;
            // Pokud kód požaduje i materiály (include)
            if (include?.materials) {
                return { ...course, materials: materials.filter(m => m.courseId === where.id) };
            }
            return course;
        },
        findMany: async () => courses
    },
    courseMaterial: {
        findMany: async ({ where }: any) => {
            return materials
                .filter(m => m.courseId === where.courseId)
                .sort((a, b) => b.createdAt - a.createdAt);
        },
        create: async ({ data }: any) => {
            const newMaterial = { 
                ...data, 
                id: data.id || Math.random().toString(36).substring(7),
                createdAt: new Date()
            };
            materials.push(newMaterial);
            return newMaterial;
        },
        update: async ({ where, data }: any) => {
            const index = materials.findIndex(m => m.id === where.id);
            if (index === -1) throw new Error("Material not found");
            materials[index] = { ...materials[index], ...data };
            return materials[index];
        },
        delete: async ({ where }: any) => {
            materials = materials.filter(m => m.id !== where.id);
            return { id: where.id };
        }
    }
};
