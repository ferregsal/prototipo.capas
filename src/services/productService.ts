import { ProductInput } from "../models/productModel";
import { ProductRepository } from "../data/productRepository";

export const ProductService = {
    create: async (data: ProductInput) => {
        return ProductRepository.create(data);
    },

    findAll: async () => {
        return ProductRepository.findAll();
    },

    findById: async (id: string) => {
        const product = await ProductRepository.findById(id);
        if (!product) throw new Error("Product not found");
        return product;
    },

    update: async (id: string, data: Partial<ProductInput>) => {
        return ProductRepository.update(id, data);
    },

    delete: async (id: string) => {
        return ProductRepository.delete(id);
    },
};
