
import Pokemon from './pokemon-model';
import Type    from './../type/type-model';
import Q       from 'q'

var pokemon = Q.nbind(Pokemon.findAndPopulate, Pokemon),
    type    = Q.nbind(Type.findOne, Type);   

function getId (id) {

    var query = {}

    isNaN(id)
        ? query['name'] = id
        : query['national_id'] = id;

    console.log(query);

    return query;
};


export default {

    get: function (req, res, next) {

    pokemon(getId(req.params.id), res)

        // .then(function (mon) {

        //   console.log('peen');
        //   res.json(mon)
        // })

        // .fail(function (reason) {

        //   next(reason)
        // })
    }
};
