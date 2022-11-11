module.exports = {
  async up(db, client) {
    const users = await db.collection('users').insertMany([
      {
        email: 'admin@ibook.com',
        fullName: '관리자',
        role: 'admin',
        password:
          '$2b$10$6Eg7ove08IaFApmTj.1l4OflPqoXQMuBvCKSMksdn022nB4zU6IP2',
      },
    ]);
    const categories = await db.collection('categories').insertMany([
      {
        name: '여행',
      },
      {
        name: '요리',
      },
      {
        name: '참고서',
      },

      {
        name: '자기계발',
      },
      {
        name: '잡지',
      },
      {
        name: '외국어',
      },
      {
        name: '에세이',
      },
      {
        name: '고전문학',
      },
      {
        name: '경제',
      },
    ]);
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    return { users, categories };
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
