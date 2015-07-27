
import controller from './registry-controller';

module.exports = exports = function (router) {

	router.route('/registry')
		.get(controller.get)
};
