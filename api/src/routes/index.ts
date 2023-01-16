import { Router } from "express";
import { routeBeneficiarios } from "./routes.beneficiarios";
import { routesEndereco } from "./routes.endereco";
import { routesGovernanca } from "./routes.governanca";
import { routesOsc } from "./routes.osc";
import { routesUsuarios } from "./routes.usuarios";

const routes = Router();

routes.use(routesUsuarios);
routes.use(routesOsc);
routes.use(routesEndereco);
routes.use(routesGovernanca);
routes.use(routeBeneficiarios);

export { routes };