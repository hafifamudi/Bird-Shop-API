
exports.seed = function(knex) {

  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'libgen sis',
          username: 'libgen',
          password: 'password',
          email: 'me@isomr.co',
          guid: 'f03ede7c-b121-4112-bcc7-130a3e87977c',
          created_at: '2021-04-09 23:20:25',
      },
      {
        name: 'pandev john',
        username: 'pandev',
        password: 'password',
        email: 'me@isomr.co',
        guid: 'f03ede7c-b121-4112-bcc7-130a3e87999c',
        created_at: '2021-05-09 23:20:25',
    },
      ]);
    });
};
