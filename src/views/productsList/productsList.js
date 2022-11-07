import * as Api from '/api.js';

const fictionList = document.querySelector(".fictionList");
const categoryName = document.querySelector(".categoryName");

const url = window.location.href;
const categoryId = url.split("/")[4];


//상단 카테고리명 추가
showCategoryName();

async function showCategoryName() {
  const category = await Api.get("http://localhost:5000/api/categories");
  console.log(category);
  const currentCategory = category.filter(e => e._id === categoryId);
  const currentCategoryName = currentCategory[0].name;

  categoryName.innerText = currentCategoryName;

}


showProductsList();

async function showProductsList() {

    // const url = window.location.pathname;
    // const categoryId = url.split("/")[2];
    
    const totalBooks = await Api.get("/api/products");
    //console.log(totalBooks);

    //클릭한 카테고리 id 비교
    const productsList = totalBooks.filter( (e) => e.category._id === `${categoryId}` );
    //console.log(productsList);

    if(!productsList) {
        const nothingToShow = `<li>표시할 책 내용이 없습니다</li>`;
        fictionList.insertAdjacentHTML('beforeend', nothingToShow);
    };

    for (let i=0; i < productsList.length; i++) {
        const toShow = `
        <div><img src="${productsList[i].images}"/></div>
        <li>책이름 : ${productsList[i].title}</li>
        <li>저자 :${productsList[i].author}</li>
        <li>출판사 : ${productsList[i].publisher}</li>
        <li>상세정보 : ${productsList[i].description}</li>
        <li>금액 : ${productsList[i].price}원</li>
        </div>
        `;

        fictionList.insertAdjacentHTML('beforeend', toShow);
    };


    
    }