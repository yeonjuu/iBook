// import { application } from "express";
// //api.js 파일 import

const fakeData = [
  //postman으로 생성하고 get하면 이런식의 데이터가 보인다
  {
    _id: '6363f42bccf95f9f6fe1d3d9',
    title: '트렌드코리아2023',
    author: '서울대',
    price: 18000,
    publisher: '출판사',
    images: ['ur1', 'url2'],
    description: '상세설명',
    rate: 0,
    category: '인문',
    createdAt: '2022-11-03T17:02:35.211Z',
    updatedAt: '2022-11-03T17:02:35.211Z',
    __v: 0,
  },
  {
    title: '하얼빈',
    image:
      'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788954699914.jpg',
  },
  {
    title: '트렌드 코리아',
    image:
      'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788959897094.jpg',
  },
  {
    title: '불편한 편의점2',
    image:
      'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791161571188.jpg',
  },
  {
    title: '역행자',
    image:
      'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788901260716.jpg',
  },
];

const firstRow = document.querySelector('#firstRow');
const secondRow = document.querySelector('#secondRow');
const thirdRow = document.querySelector('#thirdRow');

function loadHandler() {
  const bookImage = fakeData.map((e) => e.image);
  const bookTitle = fakeData.map((e) => e.title);

  for (let i = 0; i < 5; i++) {
    const booktags = `<div><a href="#">
        <img src="${bookImage[i]}"/>
        <span>${bookTitle[i]}</span>
        </a></div>`;
    firstRow.insertAdjacentHTML('beforeend', booktags);
    secondRow.insertAdjacentHTML('beforeend', booktags);
    thirdRow.insertAdjacentHTML('beforeend', booktags);
  }
}

document.addEventListener('DOMContentLoaded', loadHandler);
