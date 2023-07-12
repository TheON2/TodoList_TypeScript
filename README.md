# TodoList_TypeScript

## 기존에 CRA 기반 REACT로 완성된 TODOLIST의 프론트 코드를 
## VITE 기반의 TypeScript코드로 리팩토링 하는 레포 입니다.

## 1차완료 7/12

- 모든 파일 tsx/ts로 전환 및 allowJS off 시에도 에러 없이 실행가능
- 필수 타이핑 및 인터페이스와 제네릭 선언
- 기존 컴포넌트 구조 리팩토링
- 필수 예외 처리 및 타이핑

### tsconfig.json
```tsx
{
  "compilerOptions": {
    "target": "es2020",
    "noEmit": true,
    "jsx": "react-jsx",
    "module": "es2020",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "moduleResolution": "node",
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```
### 소스 계층구조

  ├─api : 리액트쿼리 api
  ├─axios : axios 미들웨어
  ├─components :컴포넌트 폴더
  │  ├─AddForm : Todo 쓰기
  │  ├─CustomButton : 프로젝트 공용 커스텀버튼
  │  ├─CustomModal : 투두 디테일 모달
  │  ├─Loading : 로딩모션
  │  ├─Pagination : 투두리스트 페이지네이션 담당 컴포넌트
  │  ├─Profile : 메인페이지 프로필 컴포넌트
  │  ├─ReadTodo : Todo 상세페이지
  │  ├─TodoCard : TodoCard 컴포넌트
  │  ├─Todos : 메인화면 Todolist
  │  ├─TodosInfinite : 인피니트스크롤 적용 Todolist
  │  ├─TodosList : TodoCard를 조건에 따라 렌더링 하는 컴포넌트
  │  ├─TodosPagination : 페이지네이션 적용 Todolist
  │  └─UpdateTodo : 디테일 페이지에서 Todo 수정에 사용되는 컴포넌트
  ├─hooks : 커스텀훅 useInput / useMutate
  ├─layout
  │  ├─Header : 기본 레이아웃의 헤더
  │  └─Main : 기본 레이아웃의 바디
  ├─pages
  │  ├─Login : 로그인 페이지
  │  └─SignUp : 회원가입 페이지
  ├─redux
  │  ├─config : 리덕스 스토어
  │  └─reducers : 리덕스 리듀서
  └─type : 타입스크립트 타입정의
