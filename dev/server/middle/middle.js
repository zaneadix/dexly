
import express           from 'express';
import config            from './config';
import RegistryRoutes    from './routes/registry/registry-routes';
import PokemonRoutes     from './routes/pokemon/pokemon-routes';
import DescriptionRoutes from './routes/description/description-routes';
import AbilityRoutes     from './routes/ability/ability-routes';

var routers = {},
	server  = express();

var RegistryRouter     = express.Router();
routers.RegistryRouter = RegistryRouter;

var PokemonRouter     = express.Router();
routers.PokemonRouter = PokemonRouter;

var DescriptionRouter     = express.Router();
routers.DescriptionRouter = DescriptionRouter;

var AbilityRouter     = express.Router();
routers.AbilityRouter = AbilityRouter;

var EggGroupRouter     = express.Router();
routers.EggGroupRouter = EggGroupRouter;

var MoveRouter     = express.Router();
routers.MoveRouter = MoveRouter;

var TypeRouter     = express.Router();
routers.TypeRouter = TypeRouter;

config(server, express, routers);

RegistryRoutes(RegistryRouter);
PokemonRoutes(PokemonRouter);
DescriptionRoutes(DescriptionRouter);
AbilityRoutes(AbilityRouter);

export default server;
