
import controller from './pokemon-controller';

module.exports = exports = function (router) {

	router.route('/pokemon/:id')
		.get(controller.get)

  // router.route('/pokemon-detail/:id')
  //   .get(controller.getDetail)
};
