import { productsDummy } from "./productDummy.js";

console.log("data ", productsDummy);

function inquiryTemplate(h2) {
  return `
      <h2>${h2}</h2>
      <div class="search-wrap">
        <input class="searchInput" placeholder="제품명 입력.." />
        <input type="button" value="검색" class="searchBtn" />
        <input type="button" value="전체조회" class="searchAll" />
      </div>
      <div class="list"></div>`;
}

function addProductTemplate(h2) {
  return `
    <h2>${h2}</h2>
    <form
          action="/api/products/upload"
          method="post"
          enctype="multipart/form-data"
        >
          <input type="file" name="productImages" /><br />
        </form>
        <form id="product-info">
          제목 : <input type="text" name="title" /><br />
          작가 : <input type="text" name="author" /><br />
          출판사 : <input type="text" name="publisher" /><br />
          가격 : <input type="number" min="0" name="price" /><br />
          상세설명 :
          <textarea
            name="description"
            cols="50"
            placeholder="책에 대한 요약 내용"
          ></textarea>
          <button type="submit" class="add">제출하기</button>
        </form>
    
    `;
}

const products = document.querySelector(".products");
const add = document.querySelector(".add");

const landing = document.querySelector(".landing");

products.addEventListener("click", inquiryProduct);
add.addEventListener("click", addProduct);

function inquiryProduct() {
  const inquiryHtml = inquiryTemplate("상품조회");
  landing.innerHTML = inquiryHtml;

  const searchInput = document.querySelector(".searchInput");
  const searchBtn = document.querySelector(".searchBtn");
  const searchAllBtn = document.querySelector(".searchAll");
  const listEl = document.querySelector(".list");
  const updateBtn = document.querySelector(".update");
  const deleteBtn = document.querySelector(".delete");

  searchBtn.addEventListener("click", function () {
    const search = searchInput.value();
    console.log("search title ", search);
  });

  searchAllBtn.addEventListener("click", function () {
    productsDummy.forEach((productDummy, idx) => {
      console.log("product : ", productDummy);
      const title = productDummy.title;
      const author = productDummy.author;
      const imageUrl = productDummy.images;
      const price = productDummy.price;

      let productHtml = `
              <div class="product-image">
                  <img src = "${imageUrl}" alt = "${title} 대표이미지"/>
              </div>
              <span class="title">${title}</span>
              <span class="author">${author}</span>
              <span class="author">${price}</span>
              <input type="button" value="수정" class="update" />
              <input type="button" value="삭제" class="delete" />
              `;

      const productEl = document.createElement("div");
      productEl.className = "product";
      productEl.innerHTML = productHtml;
      listEl.appendChild(productEl);
    });
  });

  updateBtn.addEventListener("click", function () {
    //api에 update 전송, 데이터변경사항
  });
  deleteBtn.addEventListener("click", function () {
    //api에 delete 전송, 데이터 변경사항
  });
}

function addProduct() {
  const addHtml = addProductTemplate("상품추가");
  landing.innerHTML = addHtml;
}
