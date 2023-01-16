import { Router } from "express";
import { routesEndereco } from "./routes.endereco";
import { routesOsc } from "./routes.osc";
import { routesUsuarios } from "./routes.usuarios";

const routes = Router();

routes.use(routesUsuarios);
routes.use(routesOsc);
routes.use(routesEndereco);

export { routes };