import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ProductRepository = {
    create: async (data: {
        name: string;
        price: number;
        stock: number;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
    }) => {
        return prisma.product.create({ data });
    },

    //Encontrar todos los productos
    findAll: async () => {
        return prisma.product.findMany();
    },

    //Encontrar un producto por Id
    findById: async (id: string) => {
        return prisma.product.findUnique({ where: { id } });
    },

    // Actualizar un producto
    update: async (
        id: string,
        data: {
            name: string;
            price: number;
            stock: number;
            is_active: boolean;
            created_at: Date;
            updated_at: Date;
        }
    ) => {
        return prisma.product.update({ where: { id }, data });
    },

    // Eliminar un producto
    delete: async (id: string) => {
        return prisma.product.delete({ where: { id } });
    },
};
