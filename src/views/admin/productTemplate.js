export const serachTemplate = function (h2) {
  return `
          <h2>${h2}</h2>
          <div class="search-wrap">
            <input class="searchInput" placeholder="제품명 입력.." />
            <input type="button" value="검색" class="searchBtn" />
            <input type="button" value="전체조회" class="searchAll" />
          </div>
          <div class="list"></div>`;
};

export const productTemplate = function (product) {
  const { title, author, price, images, publisher, _id } = product;

  return `
  <div class="product" data-id = "${_id}">
  <div class="product-image">
    <img src="${images[0]}" alt="${title} 대표이미지" />
  </div>
  제목 : <span class="title">${title}</span> 작가 :
  <span class="author">${author}</span> 출판사 :
  <span class="publisher">${publisher}</span> 가격 :
  <span class="price">${price}</span>
  <input type="button" value="수정" class="update" />
  <input type="button" value="삭제" class="delete" />
</div>
    `;
};

export const getProductAddTemplate = function (h2) {
  return `
      <h2>${h2}</h2>
      <form
        id="image-info"
        enctype="multipart/form-data"
        target="iframe1">
        <input
          type="file"
          name="productImages"
          accept="image/*"
          id="product-img"
        /><br />
        <div class="preview">사진 미리보기</div>
        <button type="submit" id="upload">사진 업로드</button>
        </form>
        <br>
        <form id="product-info">
        제목 : <input type="text" name="title" class="title" /><br />
        작가 : <input type="text" name="author" class="author" /><br />
        출판사 :
        <input type="text" name="publisher" class="publisher" /><br />
        가격 :
        <input type="number" min="0" name="price" class="price" /><br />
        카테고리 :
        <select id="category">
            <option value="empty">카테고리를 선택해주세요</option></select><br />
        상세설명 :
        <textarea
          name="description"
          cols="50"
          placeholder="책에 대한 요약 내용"
          class="description"
        ></textarea>
        <button type="button" id="submit-info">저장</button>
      </form>
      <div class="msg"></div>`;
};
