import app from './middle/middle';
import syncData from './pokeapi/pokeapi';

// Launch server
app.listen(app.get('port'));
console.info('Check out ' + app.get('base url') + ':' + app.get('port'));

syncData()