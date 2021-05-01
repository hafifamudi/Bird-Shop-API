const { HOST, USER, DB, PASSWORD,}

module.exports = {

  development: {

    migrations: { tableName: 'birdshop' },
    seeds: { tableName: './seeds' },

    client: 'mysql',
    connection: {

        host: HOST,

        user: USER,
        password: PASSWORD,

        database: DB,
        charset: 'utf8',

    }

}

};
