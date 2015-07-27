
import Registry from './registry-model';
import Q        from 'q';

var registry = Q.nbind(Registry.findOne, Registry);

export default {

    get: function (req, res, next) {

        registry({ 'name' : 'national' })

        .then(function (reg) {

            res.json(reg);
        })

        .fail(function (reason) {

            next(reason);
        });
    }
};
