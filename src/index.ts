import fastify from "fastify";
import routes from "./routes";
import cors from "@fastify/cors";

const app = fastify({
    logger: true,
});

const port = Number(process.env.PORT) || 3000;

app.get("/", async (request, reply) => {
    return { hello: "world" };
});

const start = async () => {
    try {
        await app.register(cors, {
            origin: '*',
            credentials: true
        });
        await app.register(routes);
        await app.listen({ port, host: "0.0.0.0" });
    } catch (err) {
        console.log(err);
        app.log.error(err);
        process.exit(1);
    }
};
start();
