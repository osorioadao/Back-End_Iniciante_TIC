import z from "zod";

class Validatioins {
    getData = z.object({
        title: z.string(),
        description: z.string(),
        completed_at: z.string().optional()
    });
    getId = z.object({
        id: z.string()
    });
    getDataToUpdate = z.object({
        title: z.string().optional(),
        description: z.string().optional()
    });
}

export const validations = new Validatioins();