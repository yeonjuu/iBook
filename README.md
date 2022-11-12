# 인터넷 서점 iBook

<div>

<img alt="쇼핑-데모 로고" src="https://i.ibb.co/CJc8pbd/mainbanner.png">

</div>

<br />

## 1. 서비스 소개

#### 도서 등록, 장바구니 추가, 주문하기 등 쇼핑몰의 핵심 서비스를 구현했습니다.

1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD**
2. **도서 목록**을 조회 및, **제품 상세 정보**를 조회 가능함.
3. 도서 목록에서 검색 기능을 지원함.
4. 장바구니에 제품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
5. 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (localStorage, indexedDB 등)
6. 장바구니에서 주문을 진행하며, **주문 완료 후 조회 및 삭제**가 가능함.
7. 도서 상품의 이미지를 서버에 업로드할 수 있음.

<br />

### 1-1. API 문서

### https://documenter.getpostman.com/view/23970613/2s8YRqmAu6 (유저 API)

### https://documenter.getpostman.com/view/23953353/2s8YRgqEmv (카테고리 API)

### https://documenter.getpostman.com/view/23953353/2s8YRiMa3h (상품 API)

### https://documenter.getpostman.com/view/23953353/2s8YYBSSLx (주문 API)

<br>

### 1-2. 데모 영상

<details><summary>사용자 회원가입, 로그인</summary>

https://www.youtube.com/watch?v=JRz-7LWK6cI

</details>

<details><summary>카테고리 추가 및 반영</summary>
https://youtu.be/r_hdWoW8CwE

</details>

<details><summary>제품 추가 및 반영</summary>
https://youtu.be/zS4_ErTgk5s

</details>

<details><summary>장바구니 기능</summary>
https://youtu.be/xkYeHTbvIr0
</details>

<details><summary>주문 기능</summary>
https://youtu.be/TFE89cpHwgQ
</details>

<details><summary>관리자 페이지</summary>
카테고리관리 : https://youtu.be/jqAAhPTktpI
주문관리 : https://youtu.be/asf0ic48b1U
도서조회 : https://youtu.be/rwXChVFDHBw
</details>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)

1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<br />

### 1-3. 페이지 별 화면

|                                                                                                                               |                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![image](https://i.ibb.co/vJVz9jj/image.png)                                                                                  | ![image](https://i.ibb.co/q5RWmY3/image.png)                                                                                                       |
| 메인 페이지                                                                                                                   | 회원가입 화면                                                                                                                                      |
| ![image](https://i.ibb.co/gDwBy5P/image.png)                                                                                  | <img width="300" alt="관리자도서조회" src="https://user-images.githubusercontent.com/46666765/201366327-65f1f00a-b192-434f-9e8d-eccdfc6c8b76.png"> |
| 로그인 페이지                                                                                                                 | 관리자페이지 - 도서조회                                                                                                                            |
| <img width="300" src="https://user-images.githubusercontent.com/46666765/201366341-38f3639a-19d0-45f2-92e3-469c4f26e8f0.png"> | <img width="300" alt="관리자주문조회" src="https://user-images.githubusercontent.com/46666765/201366348-96750029-7fac-40d2-820e-e0c4893ce43f.png"> |
| 관리자도서수정                                                                                                                | 관리자주문조회                                                                                                                                     |

<br />

## 2. 기술 스택

![image](https://i.ibb.co/N34mXzy/image.png)

<br />

### 2-1. 프론트엔드

- **Vanilla javascript**, html, css (**Bulma css**)

### 2-2. 백엔드

- **Express** (nodemon, babel-node로 실행됩니다.)
- Mongodb, Mongoose
- cors
- multer

## 3. 인프라 구조

![image](https://i.ibb.co/9tGxmx0/image.png)<br />

### 3-1. 폴더 구조

- 프론트: `src/views` 폴더
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**

<br />

## 4. 제작자

| 이름   | 담당 업무   |
| ------ | ----------- |
| 이지현 | 팀장/백엔드 |
| 홍정완 | 백엔드      |
| 김민경 | 프론트엔드  |
| 박지찬 | 프론트엔드  |
| 신연주 | 프론트엔드  |

<br />

## 5. 실행 방법

1. 레포지토리를 클론하고자 하는 디렉토리에서 아래 명령어를 수행

```bash
git clone <레포지토리 주소>
```

2. 클론한 디렉토리에서 backend 디렉토리로 들어가 아래 명령어를 통해 backend에서 필요한 module 설치

```bash
npm install
```

3. backend에서 필요한 `.env` 설정

```bash
MONGODB_URL=<몽고DB URL>
PORT=5000
JWT_SECERT_KEY=<랜덤 문자열>
```

4. express 앱을 실행

```bash
npm start
```

<br>

## 6. 버전

### 1.0.0

<br>

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.
