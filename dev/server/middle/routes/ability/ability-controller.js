
import Ability from './ability-model';
import Q       from 'q'

var ability = Q.nbind(Ability.findOne, Ability);

export default {

    get: function (req, res, next) {

        var query = {};

        isNaN(req.params.id)
            ? query['name'] = req.params.id
            : query['id'] = req.params.id;

        ability(query, { _id: false })

        .then(function (mon) {

            res.json(mon);
        })
        
        .fail(function (reason) {

            next(reason);
        });
    }
};
