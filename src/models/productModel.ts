import { z } from "zod";

export const ProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().positive("Price must be positive"),
    stock: z.number().positive("Stock must be positive"),
    is_active: z.boolean(),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
});

export type ProductInput = z.infer<typeof ProductSchema>;
