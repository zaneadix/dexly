
import controller from './description-controller';

module.exports = exports = function (router) {

	router.route('/description/:id')
		.get(controller.get)
};
