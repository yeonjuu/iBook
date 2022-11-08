import * as Api from '../api.js';

const landing = document.querySelector(".landing");
const category = document.querySelector(".category");


async function categoryHandler() {

    //전체 카테고리 정보 추출
    const categoryList = await Api.get('/api/categories');
    //console.log(categoryList);

    landing.innerHTML = `
    <h2>카테고리 관리</h2>
    <div class="categoryDiv">
        <div class ="addCategory">
            <input id="addCategoryInput" class="input categoryInput" type="text" placeholder="Category">
            <button id="addBtn" class="button is-primary">추가</button>
        </div>

        <div class="editDeleteCategory">
        </div>
    </div>`;

    //요소 지정
    const addCategoryInput = document.querySelector("#addCategoryInput");
    const addBtn = document.querySelector("#addBtn");

    const editDeleteCategory = document.querySelector(".editDeleteCategory");

    //인풋값으로 보여주기
    for(let i=0; i < categoryList.length; i++) {
        const editDeleteCategoryLists = `
        <div class="editDeleteDiv" id="${categoryList[i]._id}">
        <input class="input categoryInput" type="text" value="${categoryList[i].name}">
        <button class="deleteBtn button is-danger">수정</button>
        <button class="deleteBtn button is-danger">❌</button>
        </div>`;
        editDeleteCategory.insertAdjacentHTML('beforeend', editDeleteCategoryLists);
    };
    
    //카테고리 추가
    async function addHandler() {
        const name = addCategoryInput.value;
        const data = { name };
        await Api.post('/api/categories', data);

        categoryHandler();
    };

    addBtn.addEventListener("click", addHandler);

    //카테고리 수정 삭제
    async function deleteEditHandler(e) {
        if(e.target.innerText === '❌') {
            const toDleteCategory = e.target.parentElement;
            toDleteCategory.remove();

            const toDeleteCategoryId = e.target.parentElement.id;
            await Api.delete('/api/categories', toDeleteCategoryId);
            alert("삭제되었습니다!");
        };

        if(e.target.innerText === '수정') {
            const name = e.target.parentElement.childNodes[1].value;

            const data = { name };
            const toEditCategoryId = e.target.parentElement.id;
            await Api.put('/api/categories', toEditCategoryId, data);
            alert("수정되었습니다!");
        };

    };

    editDeleteCategory.addEventListener("click", deleteEditHandler);

    
}


category.addEventListener("click", categoryHandler);