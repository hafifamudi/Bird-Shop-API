const knex = require('./knex.js');
const { getAllBirds, authUser, addBird, updateBird } = require('./handler');

const routes = [
    {
        path: '/birds',
        method: 'GET',
        handler: getAllBirds,
    },
    {
        path: '/birds',
        method: 'POST',
        handler: addBird,
    },
    {
        path: '/birds/{birdGuid}',
        method: 'PUT',
        handler: updateBird,
        options: {
            pre: [
                {
                    assign: 'auth',
                    async method (request, h)  {
                        const { birdGuid } = request.params,
                        { guid } = request.auth.credentials.user;

                        const getBird = knex( 'birds' ).where({
                            guid: birdGuid,

                        }).select(  'owner' ).then( ([result])  => {
                            if (!result){
                                const response = h.response({
                                    status: 'fail',
                                    message: 'there is no bird with that guid',
                                });
                                response.code(404);
                                return response;
                            }
                            // cek if current user guid match with token scope guid
                            if (result.owner != guid){
                                const response = h.response({
                                    status: 'fail',
                                    message: 'birds does not belong with this user',
                                });
                                response.code(400);
                                return response;
                            };

                            const response = h.response({
                                status: 'success',
                                message: 'successfully updated data',
                            });
                            response.code(200);
                            return response;
                        });
                    
                        return getBird;
                    }
                },
            ]
        }
    },
    {
        path: '/auth',
        method: 'POST',
        handler: authUser,
        config:{
            auth: false
        },
    },
];

module.exports = routes;