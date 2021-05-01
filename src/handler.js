const knex = require('./knex.js');
const key = require('../config');
const jwt = require('jsonwebtoken');
const { uuid } = require('uuidv4');

const getAllBirds = (_request, h) => {
    const getBirds = knex( 'birds' ).where( {
        isPublic: true
    } ).select( 'guid', 'name', 'species', 'picture_url' ).then( ( results ) => {

        if( !results || results.length === 0 ) {

            const response = h.response( {
                status: 'fail',
                message: 'no public bird found',

            } );

            response.code(404);
            return response;
        }

        const response = h.response({
            status: 'success',
            data: results,
        } );
        return response;

    } ).catch( ( err ) => {

        const response = h.response({  
            status: 'fail',
            message: err, 
        });

        response.code(500);
        return response;
    } );

    return getBirds;

};

const authUser = (request, h) => {
    const { username, password } = request.payload;

    const getUser = knex('users').where({
        username,
    }).select('guid', 'password').then(( [ user ] ) => {
        if (!user) {
            const response = h.response({
                status: 'fail',
                message: 'The specified user not found!',
            })
            response.code(200);
            return response;
        }
      
        if (user.password === password) {
            const userData = {
                username,
                scope: user.guid,
            }
            const token = jwt.sign(userData,key);

            const response = h.response({
                status: 'success',
                data:{
                    token,
                    scope: user.guid,
                }
            })
            response.code(200);
            return response;
        }else{
            const response = h.response({
                status: 'fail',
                message: 'incorrect Password!',
            });
            response.code(400);
            return response;
        }
    }).catch(_err => {
        const response = h.response({
            status: 'fail',
            message: 'internal server error',
        });

        response.code(500);
        return response;
    });

    return getUser;
}

const addBird = (request, h) => {
    const timestamp = new Date();
    const { 
        name,
        species,
        picture_url, 
        isPublic,
    } = request.payload;
    console.log(uuid());
    const insertBird = knex( 'birds' ).insert({
        owner: request.auth.credentials.user.guid,
        name,
        species,
        picture_url,
        guid: uuid(),
        isPublic,
        created_at: timestamp,

    }).then(result => {
        const response = h.response({
            status: 'success',
            data: result,
        });
        response.code(200);
        return response

    }).catch(err => {
        const response = h.response({
            status: 'fail',
            message: err
        });
        response.code(400);
        return response;
    });

    return insertBird;
}

const updateBird = (request, h) => {
    const { birdGuid } = request.params,
    { 
        name,
        species,
        picture_url,
        isPublic,
    } = request.payload;

    // validate the users with the value prerequisite method
    const { auth } = request.pre;
    
    if (auth.status){
        const response = h.response({
            status: auth.status,
            message: auth.message,
        });
        response.code(400);
        return response;
    };

    const update = knex( 'birds' ).where({
        guid: birdGuid
    
    }).update({
        name,
        species,
        picture_url,
        isPublic,
   
    });

    return update;
}
module.exports = { getAllBirds, authUser, addBird, updateBird };