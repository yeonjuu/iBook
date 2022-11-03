const fakeData = [
    {
        title : "카메라를 끄고 씁니다",
        image : "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788960907775.jpg",
    },
    {
        title : "하얼빈",
        image : "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788954699914.jpg",
    },
    {
        title : "트렌드 코리아",
        image : "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788959897094.jpg",
    },
    {
        title : "불편한 편의점2",
        image : "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791161571188.jpg"
    },
    {
        title : "역행자",
        image : "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788901260716.jpg",
    }
];


const firstRow = document.querySelector("#firstRow");
const secondRow = document.querySelector("#secondRow");
const thirdRow = document.querySelector("#thirdRow");



function loadHandler() {
    const bookImage = fakeData.map((e) => e.image);
    const bookTitle = fakeData.map((e) => e.title);


    for (let i = 0; i < 5; i++) {
        const booktags = `<div><a href="">
        <img src="${bookImage[i]}"/>
        <span>${bookTitle[i]}</span>
        </a></div>`;
        firstRow.insertAdjacentHTML('beforeend', booktags);
        secondRow.insertAdjacentHTML('beforeend', booktags);
        thirdRow.insertAdjacentHTML('beforeend', booktags);


    }

    }



document.addEventListener("DOMContentLoaded", loadHandler);