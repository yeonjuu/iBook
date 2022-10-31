import { categoryModel } from "../db";

class CategoryService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  // 회원가입
  async addCategory(categoryInfo) {
    // 객체 destructuring
    const { name } = categoryInfo;

    // 카테고리명 중복 확인
    const category = await this.categoryModel.findByName(name);
    if (category) {
      throw new Error(
        "이 카테고리명은 현재 사용중입니다. 다른 카테고리명으로 입력해 주세요."
      );
    }

    // 카테고리명 중복은 이제 아니므로, 카테고리 생성을 진행함

    // db에 저장
    const createdNewCategory = await this.categoryModel.create(categoryInfo);

    return createdNewCategory;
  }

  // 카테고리 목록을 받음.
  async getCategories() {
    const categories = await this.categoryModel.findAll();
    return categories;
  }

  // 카테고리정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  // async setUser(userInfoRequired, toUpdate) {
  //   // 객체 destructuring
  //   const { userId, currentPassword } = userInfoRequired;

  //   // 우선 해당 id의 유저가 db에 있는지 확인
  //   let user = await this.userModel.findById(userId);

  //   // db에서 찾지 못한 경우, 에러 메시지 반환
  //   if (!user) {
  //     throw new Error("가입 내역이 없습니다. 다시 한 번 확인해 주세요.");
  //   }

  //   // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함

  //   // 비밀번호 일치 여부 확인
  //   const correctPasswordHash = user.password;
  //   const isPasswordCorrect = await bcrypt.compare(
  //     currentPassword,
  //     correctPasswordHash
  //   );

  //   if (!isPasswordCorrect) {
  //     throw new Error(
  //       "현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요."
  //     );
  //   }

  //   // 이제 드디어 업데이트 시작

  //   // 비밀번호도 변경하는 경우에는, 회원가입 때처럼 해쉬화 해주어야 함.
  //   const { password } = toUpdate;

  //   if (password) {
  //     const newPasswordHash = await bcrypt.hash(password, 10);
  //     toUpdate.password = newPasswordHash;
  //   }

  //   // 업데이트 진행
  //   user = await this.userModel.update({
  //     userId,
  //     update: toUpdate,
  //   });

  //   return user;
  // }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
