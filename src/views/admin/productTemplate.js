import { addCommas } from '../useful-functions.js';

export function serachTemplate(h2) {
  return `
          <h2>${h2}</h2>
          <div class="search-wrap">
            <input class="searchInput" placeholder="도서 제목 입력.." />
            <input type="button" value="검색" class="searchBtn" />
            <input type="button" value="전체검색" class="searchAll" />
          </div>
          <div class="list"></div>`;
}

export function productTemplate(product) {
  const { title, author, price, images, publisher, _id } = product;

  return `
  <div class="product" data-id = "${_id}">
  <div class="product-image">
    <img src="${images[0]}" alt="${title} 대표이미지" />
  </div>
  <div class="info-wrap">
  <span class="title">${title}</span>
  <span class="author">${author}</span> 
  <span class="publisher">${publisher}</span> 
  <span class="price">${addCommas(price)}원</span>
  </div>
  <div class= "btn-wrap">
  <input type="button" value="수정" class="update" />
  <input type="button" value="삭제" class="del" />
  </div>
</div>
    `;
}

export function getProductAddTemplate(h2) {
  return `
  <h2>${h2}</h2>
  <form id="product-info" enctype="multipart/form-data">
    <div class="left">
      <label for="product-img">도서 이미지 업로드</label>
      <input
        type="file"
        name="productImages"
        accept="image/*"
        id="product-img"
        required
      /><br />
      <div class="preview">
      <div>
      <img src = "https://cdn.pixabay.com/photo/2021/03/02/17/19/book-6063198_1280.png" alt ="preview image"></img>
      </div>
      이미지 미리보기
      </div>
    </div>
    <div class="right">
      <span>제목</span>
      <input type="text" name="title" class="title input" required /><br />
      <span>작가</span>
      <input type="text" name="author" class="author input" required /><br />
      <span>출판사</span>
      <input
        type="text"
        name="publisher"
        class="publisher input"
        required
      /><br />
      <span>가격</span>
      <input
        type="number"
        min="0"
        name="price"
        class="price input"
        required
      /><br />
      <span>카테고리</span>
      <select id="category" required>
        <option value="" selected disabled hidden>
          카테고리를 선택해주세요
        </option></select
      ><br />
      <span>상세설명</span>
      <textarea
        name="description"
        cols="50"
        class="description input"
        required
      ></textarea>
      <button type="submit" id="submit-info">저장</button>
    </div>
  </form>`;
}

export function curtImage(src, title) {
  return `
  <div>
  <img src = "${src}" alt = "${title} 대표이미지" />
  </div>
  `;
}
