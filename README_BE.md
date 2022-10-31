# BE 리드미

## REST API 설계 기초
API 설계는 기본적으로 CRUD(Create, Read, Update, Delete)를 바탕으로 이뤄집니다.

User(사용자) API를 예시로 설명하겠습니다.

### Create
- Method: POST
- Path: /users

### Read
- Method: GET
- Path
  - /users (사용자 목록 조회)
  - /users/:userId (특정 사용자 조회)

### Update
- Method: PUT (or PATCH)
- Path: /users/:userId

> PUT vs PATCH
> 대부분의 수정의 경우 현재 화면에 보여지는 모든 정보를 그대로 반영한다고 생각하기 때문에, PUT을 이용해 전체 정보 모두를 수정 API로 보냅니다.
> 실제로 수정을 처리하는 부분은 BE 코드에서 이뤄지기 때문에, PUT, PATCH는 수정을 위한 API라는 규칙이라고 생각하면 됩니다.
> 현업에 가면 어떤 팀에서는 PATCH를 이용해서 수정 API를 구현할 수도 있고, 다른 팀에서는 PUT을 이용해서 구현하는 곳도 있을 것입니다.
> 어떤 메서드를 사용하던 중요한 것은 함께 일하는 팀원간에 규칙을 정해서 통일성만 유지한다면 전혀 문제되는 것은 없습니다.
> 저는 PUT를 선호하기에 PUT을 기준으로 가이드 드리고 있습니다.
>
> - [[HTTP METHOD] PUT vs PATCH 차이점](https://papababo.tistory.com/entry/HTTP-METHOD-PUT-vs-PATCH-차이점)
> - [멱등, 비멱등 / PUT, PATCH의 사용](https://velog.io/@kakasoo/%EB%A9%B1%EB%93%B1-%EB%B9%84%EB%A9%B1%EB%93%B1-PUT-PATCH%EC%9D%98-%EC%82%AC%EC%9A%A9)

### Delete
- Method: DELETE
- Path: /users/:userId

## 참고
- https://restfulapi.net/rest-api-design-tutorial-with-example/