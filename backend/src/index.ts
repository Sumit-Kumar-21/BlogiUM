import { Hono } from "hono";
import { router } from "./router/user";
import { cors } from "hono/cors";
const app = new Hono();

app.use(cors())
app.route("/api/v1/user", router);

export default app;
