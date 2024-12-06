import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { validations } from "../validations";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function routes(app: FastifyInstance) {
    app.post("/tarefa", async (req: FastifyRequest, res: FastifyReply) => {
        const data = validations.getData.parse(req.body);

        const newTarefa = await prisma.tarefa.create({
            data,
        });

        return newTarefa;
    });

    app.get("/tarefa", async (req: FastifyRequest, res: FastifyReply) => {
        const tarefas = await prisma.tarefa.findMany();

        return tarefas;
    });

    app.put("/tarefa/:id", async (req: FastifyRequest, res: FastifyReply) => {
        const id = validations.getId.parse(req.params);
        const data = validations.getDataToUpdate.parse(req.body);

        const checkTarefa = await prisma.tarefa.findUnique({
            where: id,
        });

        if (!checkTarefa) {
            res.status(404);
            return { error: "Tarefa não encontrada" };
        }

        const tarefa = await prisma.tarefa.update({
            where: id,
            data,
        });

        return tarefa;
    });

    app.delete("/tarefa/:id", async (req: FastifyRequest, res: FastifyReply) => {
        const id = validations.getId.parse(req.params);

        const checkTarefa = await prisma.tarefa.findUnique({
            where: id,
        });

        if (!checkTarefa) {
            res.status(404);
            return { error: "Tarefa não encontrada" };
        }

        const tarefa = await prisma.tarefa.delete({
            where: id,
        });

        return tarefa;
    }); 
}