import { Router } from "express";
import { routesOsc } from "./routes.osc";
import { routesUsuarios } from "./routes.usuarios";

const routes = Router();

routes.use(routesUsuarios);
routes.use(routesOsc);

export { routes };