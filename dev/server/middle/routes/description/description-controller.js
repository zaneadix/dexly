
import Description from './description-model';
import Q           from 'q'

var description = Q.nbind(Description.find, Description);

export default {

    get: function (req, res, next) {

        var mon = {}

        isNaN(req.params.id)
            ? mon['pokemon.name'] = req.params.id
            : mon['pokemon.national_id'] = req.params.id


        description(mon)

        .then(function (mon) {

            res.json(mon)
        })

        .fail(function (reason) {

            next(reason)
        })
    }
};
