
import controller from './ability-controller';

module.exports = exports = function (router) {

	router.route('/ability/:id')
		.get(controller.get)
};
