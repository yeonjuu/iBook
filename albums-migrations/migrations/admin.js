module.exports = {
  async up(db, client) {
    return db.collection('users').insertMany([
      {
        email: 'admin@ibook.com',
        fullName: '관리자',
        role: 'admin-user',
        password:
          '$2b$10$6Eg7ove08IaFApmTj.1l4OflPqoXQMuBvCKSMksdn022nB4zU6IP2',
      },
    ]);
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
