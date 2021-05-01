
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('birds').del()
    .then(function () {
      // Inserts seed entries
      return knex('birds').insert([
        {
          owner: 'f03ede7c-b121-4112-bcc7-130a3e87977c',
          species: 'Tarantula',
          name: 'Lonte',
          picture_url: 'http://pngimg.com/upload/pigeon_PNG3423.png',
          guid: '4c8d84f1-9e41-4e78-a254-0a5680cd19d5',
          isPublic: true,
          created_at: '2021-04-09 23:20:25',
      },
      {
        owner: 'f03ede7c-b121-4112-bcc7-130a3e87999c',
        species: 'Labinta',
        name: 'Mourning  Titus',
        picture_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mourning_Dove_2006.jpg/220px-Mourning_Dove_2006.jpg',
        guid: 'ddb8a136-6df4-4cf3-98c6-d29b9da4fbc6',
        isPublic: false,
        created_at: '2021-04-09 23:20:25',
      },
      ]);
    });
};
