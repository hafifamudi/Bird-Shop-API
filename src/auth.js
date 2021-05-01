const knex = require('./knex.js');

const validate = async function (decoded, request, h) {
    const validateUser = knex('users').where({
        guid: decoded.scope,
    }).select().then(( [ user ] ) => {
        if (!user) {
         return { isValid:false };
        }

        return { isValid: true, credentials: { user }}
    }).catch(_err => {
        const response = h.response({
            status: 'fail',
            message: 'internal server error',
        });

        response.code(500);
        return response;
    })

    return validateUser;
};

module.exports = validate;