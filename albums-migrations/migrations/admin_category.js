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
    // const products = await db.collection('products').insertMany([
    //   {
    //     title: '트렌드 코리아 2023',
    //     author: '펭귄',
    //     price: 4000,
    //     publisher: '비',
    //     images: [
    //       'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788959897094.jpg',
    //       'url2',
    //     ],
    //     description: '대한민국의 2023 트렌드',
    //     categoryId: '636c6db4a1337ca5c0b3995f',
    //     category: '636c6db4a1337ca5c0b3995f',
    //   },
    //   {
    //     title: '세상의 마지막 기차역',
    //     author: '강아지',
    //     price: 9000,
    //     publisher: '에이',
    //     images: [
    //       'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791191043754.jpg',
    //       'url2',
    //     ],
    //     description: '기차역에서 펼쳐지는 스릴러',
    //     categoryId: '636c6ef1f67bcaa527b5425e',
    //   },
    //   {
    //     title: '하얼빈',
    //     author: '토끼',
    //     price: 3000,
    //     publisher: '문학동네',
    //     images: [
    //       'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788954699914.jpg',
    //       'url2',
    //     ],
    //     description: '상세설명',
    //     categoryId: '636c6ef1f67bcaa527b5425e',
    //     category: {
    //       _id: '636c6ef1f67bcaa527b5425e',
    //       name: '소설',
    //     },
    //   },
    // {
    //   title: '마',
    //   author: '참새',
    //   price: 2000,
    //   publisher: '유',
    //   images: [
    //     'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788954699914.jpg',
    //     'url2',
    //   ],
    //   description: '상세설명',
    //   categoryId: '636c6db4a1337ca5c0b3995a',
    // },
    // {
    //   title: '고양이',
    //   author: '캣츠',
    //   price: 12000,
    //   publisher: 'cats',
    //   images: [
    //     'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788960907775.jpg',
    //     'url2',
    //   ],
    //   description: '상세설명',

    //   categoryId: '636c6ef1f67bcaa527b5425e',
    // },
    // {
    //   title: '랑과 나의 사막',
    //   author: '천선란',
    //   price: 3000,
    //   publisher: '현대문학',
    //   images: [
    //     'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791167901354.jpg',
    //   ],
    //   description: '현대문학 핀 시리즈〉의 마흔세 번째 소설선.',
    //   categoryId: '636c6db4a1337ca5c0b3995a',
    // },
    // {
    //   title: '나 혼자만 알고 싶은 실전 심리학',
    //   author: '왕리',
    //   price: 15000,
    //   publisher: '미디어숲',
    //   images: [
    //     'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158741709.jpg',
    //     'url2',
    //   ],
    //   description: '사람의 속마음을 거울처럼 들여다본다',
    //   categoryId: '636c6db4a1337ca5c0b3995a',
    // },
    // {
    //   title: '인생의 허무를 어떻게 할 것인가',
    //   author: '김영민',
    //   price: 14400,
    //   publisher: '사회평론아카데미',
    //   images: [
    //     'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791167070791.jpg',
    //     'url2',
    //   ],
    //   description: '서울대 교수가 들려주는 인생의 허무와 더불어 사는 법',
    //   rate: 0,
    //   categoryId: '636c6db4a1337ca5c0b3995a',
    // },
    // {
    //   title: '인생의 역사',
    //   author: '신형철',
    //   price: 16200,
    //   publisher: '난다',
    //   images: [
    //     'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791191859379.jpg',
    //     'url2',
    //   ],
    //   description: '더불어 사는 법',
    //   categoryId: '636c6db4a1337ca5c0b3995a',
    // },
    // {
    //   title: '심리학이 조조에게 말하다 2',
    //   author: '천위안',
    //   price: 16000,
    //   publisher: '리드리드출판',
    //   images: [
    //     'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788972773689.jpg',
    //     'url2',
    //   ],
    //   description: '진실이 때론 거짓보다 위험하다',
    //   categoryId: '636c6db4a1337ca5c0b3995a',
    // },
    // {
    //   title: 'Lonely Planet Korea 12',
    //   author: 'Damian Harper',
    //   price: 22950,
    //   publisher: 'Lonely Planet',
    //   images: [
    //     'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9781788680462.jpg',
    //     'url2',
    //   ],
    //   description: '진실이 때론 거짓보다 위험하다',
    //   categoryId: '636c6db4a1337ca5c0b3995a',
    // },
    // {
    //   title: '아버지의 해방일지',
    //   author: '정지아',
    //   price: 13500,
    //   publisher: '창비',
    //   images: [
    //     'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788936438838.jpg',
    //     'url2',
    //   ],
    //   description: '미스터리 같은 한 남자가 헤쳐온 역사의 격랑',
    //   rate: 0,
    //   categoryId: '636c6db4a1337ca5c0b39958',
    // },
    // {
    //   title: ' 잘될 수밖에 없는 너에게',
    //   author: '최서영',
    //   price: 14440,
    //   publisher: '창비',
    //   images: [
    //     'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791191891201.jpg',
    //     'url2',
    //   ],
    //   description: '미스터리 같은 한 남자가 헤쳐온 역사의 격랑',
    //   categoryId: '636c6db4a1337ca5c0b3995a',
    // },
    // {
    //   title: ' 원씽',
    //   author: '게리',
    //   price: 12600,
    //   publisher: '비즈니스북스',
    //   images: [
    //     'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788997575169.jpg',
    //     'url2',
    //   ],
    //   description: '자신의 인생에서 가장 중요한 ‘원씽’을 찾아라!',
    //   categoryId: '636c6db4a1337ca5c0b3995a',
    // },
    // {
    //   title: 'elice',
    //   author: '엘리수',
    //   price: 1000,
    //   publisher: '엘리스스',
    //   images: [''],
    //   description: '엘리스와 함께하는 환상적인 여정',
    //   categoryId: '636c6db4a1337ca5c0b3995b',
    // },
    // ]);

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
    return { products };
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
