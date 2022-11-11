import * as Api from '../api.js';

const landing = document.querySelector('.landing');
const category = document.querySelector('.category');

async function categoryHandler() {
  //전체 카테고리 정보 추출
  const categoryList = await Api.get('/api/categories');
  //console.log(categoryList);

  landing.innerHTML = `
    <h2>카테고리관리</h2>
    <div class="categoryDiv">
        <div class ="addCategory">
            <div class="addCategoryInputDiv">
            <input id="addCategoryInput" class="input categoryInput" type="text" placeholder="카테고리명을 입력해주세요">
            </div>
            <button id="addBtn" class="button is-primary">추가하기</button>
        </div>

        <div class="editDeleteCategory">
        </div>
    </div>`;

  //요소 지정
  const addCategoryInput = document.querySelector('#addCategoryInput');
  const addBtn = document.querySelector('#addBtn');

  const editDeleteCategory = document.querySelector('.editDeleteCategory');

  //인풋값으로 보여주기
  for (let i = 0; i < categoryList.length; i++) {
    const editDeleteCategoryLists = `
        <div class="editDeleteDiv" id="${categoryList[i]._id}">

        <input class="input categoryInput" type="text" value="${categoryList[i].name}">

        <button class="editBtn button is-info">수정</button>
        <button class="deleteBtn button is-danger">삭제</button>

        </div>`;
    editDeleteCategory.insertAdjacentHTML('beforeend', editDeleteCategoryLists);
  }

  //카테고리 추가
  async function addHandler() {
    const name = addCategoryInput.value;
    const data = { name };
    await Api.post('/api/categories', data);
    alert('추가되었습니다!');

    categoryHandler();
  }

  addBtn.addEventListener('click', addHandler);

  //카테고리 수정 삭제
  async function deleteEditHandler(e) {
    if (e.target.innerText === '삭제') {
      const toDeleteCategoryId = e.target.parentElement.id;

      const name = e.target.parentElement.childNodes[1].value;
      let deleteConfirm = window.confirm(
        `카테고리 "${name}" 을/를 삭제 하시겠습니까?`
      );
      const products = await Api.get(
        '/api/products',
        `?categoryId=${toDeleteCategoryId}`
      );
      if (products.length !== 0) {
        alert('카테고리 내에 속한 상품이 있어 삭제가 안됩니다.(삭제취소)');
      } else {
        if (deleteConfirm) {
          const toDleteCategory = e.target.parentElement;
          toDleteCategory.remove();

          await Api.delete('/api/categories', toDeleteCategoryId);
          alert('삭제되었습니다!');
        }
      }
    }

    if (e.target.innerText === '수정') {
      const name = e.target.parentElement.childNodes[1].value;

      let editConfirm = window.confirm(
        `카테고리 "${name}" 을/를 수정 하시겠습니까?`
      );

      if (editConfirm) {
        const data = { name };
        const toEditCategoryId = e.target.parentElement.id;
        await Api.put('/api/categories', toEditCategoryId, data);
        alert('수정되었습니다!');
      }
    }
  }

  editDeleteCategory.addEventListener('click', deleteEditHandler);
}

category.addEventListener('click', categoryHandler);
