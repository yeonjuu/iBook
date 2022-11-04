const fiction = [
    {
        "title": "첫번쨰",
        "author": "김씨",
        "price": 1000,
        "publisher": "A",
        "images": "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788960907775.jpg",
        "description": "흥미진진",
        "categoryId": "6361f8f75192bb1231428a13"
    },
    {
        "title": "두번째",
        "author": "박씨",
        "price": 2000,
        "publisher": "B",
        "images": "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788954699914.jpg",
        "description": "소름돋는",
        "categoryId": "6361f8f75192bb1231428a13"
    },
    {
        "title": "세번째",
        "author": "이씨",
        "price": 3000,
        "publisher": "C",
        "images": "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788959897094.jpg",
        "description": "정신번쩍",
        "categoryId": "6361f8f75192bb1231428a13"
    }
];

const fictionList = document.querySelector(".fictionList");

function loadHandler() {
    for(let i=0; i < fiction.length; i++) {
        console.log(fiction[0]);

        const toShow = `
        
        <div><img src="${fiction[i].images}"/></div>
        <li>책이름 : ${fiction[i].title}</li>
        <li>저자 :${fiction[i].author}</li>
        <li>출판사 : ${fiction[i].publisher}</li>
        <li>상세정보 : ${fiction[i].description}</li>
        <li>금액 : ${fiction[i].price}원</li>
        </div>
        `;

        fictionList.insertAdjacentHTML('beforeend', toShow);
    
    }
}


document.addEventListener("DOMContentLoaded", loadHandler);


// 데이터 통신시 받아오는 값
// const fictionList = document.querySelector(".fictionList");

// insertFiction();

// async insertFiction() {
//     const res = await fetch(`http://localhost:5000/api/products/6362325d02731c2524d6955b`);
//     const data = await res.json();
  
//     const image = data.image;
//     const title = data.title;
//     const author = data.author;
//     const publisher = data.publisher;
//     const description = data.description;
//     const price = data.price;

//     fictionList.insertAdjacentHTML(`
//     <div>${image}</div>
//     <span>${title}</span>
//     <span>${author}</span>
//     <span>${publisher}</span>
//     <span>${description}</span>
//     <span>${price}</span>
//     `);
// };


