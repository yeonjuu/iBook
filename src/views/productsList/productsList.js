import * as Api from '/api.js';

const fictionList = document.querySelector(".fictionList");

viewCategory();

async function viewCategory() {

    const totalBooks = await Api.get("http://localhost:5000/api/products");
    console.log(totalBooks);

    //소설 대신 클릭한 카테고리 id랑 비교하는 방식으로 변경 필요함
    const scienceFiction = totalBooks.filter( (e) => e.category.name === "소설" );
    console.log(scienceFiction);


    for (let i=0; i < scienceFiction.length; i++) {

        const toShow = `
        <div><img src="${scienceFiction[i].images}"/></div>
        <li>책이름 : ${scienceFiction[i].title}</li>
        <li>저자 :${scienceFiction[i].author}</li>
        <li>출판사 : ${scienceFiction[i].publisher}</li>
        <li>상세정보 : ${scienceFiction[i].description}</li>
        <li>금액 : ${scienceFiction[i].price}원</li>
        </div>
        `;

        fictionList.insertAdjacentHTML('beforeend', toShow);
    };


    
    }