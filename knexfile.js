// Update with your config settings.

module.exports = {

  development: {

    migrations: { tableName: 'birdshop' },
    seeds: { tableName: './seeds' },

    client: 'mysql',
    connection: {

        host: 'localhost',

        user: 'root',
        password: 'rootuser',

        database: 'hapi_db',
        charset: 'utf8',

    }

}

};
