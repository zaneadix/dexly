
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';


mongoose.connect(process.env.DB_URL || 'mongodb://localhost/dex', function(error, db) {

	if (!error) {
		console.log('Connected to database')
	} else {
		console.log('Failed to connect to database')
	}
});


export default function (app, express, routers) {

	app.set('port', process.env.PORT || 2000);
	app.set('base url', process.env.URL || 'http://localhost');

	app.use(morgan('dev'));

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	//for all clients
	app.use(express.static(__dirname + '/../../client'));

	app.use('/', routers.RegistryRouter);
	app.use('/', routers.PokemonRouter);
	app.use('/', routers.DescriptionRouter);
	app.use('/', routers.AbilityRouter);
	app.use('/', routers.EggGroupRouter);
	app.use('/', routers.MoveRouter);
	app.use('/', routers.TypeRouter);
};