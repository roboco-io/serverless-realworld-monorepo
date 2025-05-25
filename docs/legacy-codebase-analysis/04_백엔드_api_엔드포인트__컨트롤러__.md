# Chapter 4: 백엔드 API 엔드포인트 (컨트롤러)


안녕하세요! 지난 [제3장: 프론트엔드 API 라우트](03_프론트엔드_api_라우트_.md)에서는 프론트엔드 애플리케이션 내부에 만들어진 작은 API 서버, 즉 "웨이터"와 같은 프론트엔드 API 라우트에 대해 배웠습니다. 이 웨이터는 사용자의 요청을 받아 정리하고, 때로는 진짜 "주방"으로 주문을 전달한다고 했죠.

이번 장에서는 드디어 그 **"진짜 주방"**, 바로 **백엔드 API 엔드포인트 (컨트롤러)**에 대해 알아보겠습니다. 이곳은 우리 애플리케이션의 핵심 기능들이 실제로 처리되는 중요한 장소입니다.

## 왜 백엔드 API 엔드포인트가 필요할까요?

여러분이 웹사이트에서 회원가입을 하거나, 새 블로그 글을 작성한다고 생각해 보세요.
1.  **프론트엔드**: 사용자는 화면에서 이름, 이메일, 비밀번호 또는 글 제목과 내용을 입력합니다.
2.  **프론트엔드 API 라우트 (선택 사항)**: 이 정보는 [제3장: 프론트엔드 API 라우트](03_프론트엔드_api_라우트_.md)에서 배운 것처럼 프론트엔드 내부의 API 라우트를 거칠 수도 있습니다.
3.  **백엔드 API 엔드포인트**: 결국 이 데이터는 어딘가에 안전하게 저장되고 처리되어야 합니다. 그 "어딘가"로 들어가는 공식적인 "문"이 바로 백엔드 API 엔드포인트입니다.

이 백엔드 API 엔드포인트가 없다면, 프론트엔드는 데이터를 어디로 보내야 할지, 어떻게 처리해야 할지 알 수 없을 거예요. 마치 주방 없는 레스토랑과 같죠!

## 백엔드 API 엔드포인트 (컨트롤러)란 무엇인가요?

백엔드 API 엔드포인트는 **외부(주로 프론트엔드)에서 백엔드의 특정 기능에 접근할 수 있도록 열어둔 '공식적인 창구' 또는 '문'**입니다. 각 엔드포인트는 고유한 주소(URL)를 가지며, 정해진 형식으로 요청을 받으면 해당 기능을 수행하는 내부 로직([제5장: 백엔드 핵심 서비스 로직](05_백엔드_핵심_서비스_로직_.md)에서 자세히 다룹니다)을 호출합니다.

마치 큰 건물의 각 사무실 문에 '회원가입 처리부', '게시글 관리부', '사용자 정보 조회과' 같은 이름표가 붙어 있는 것과 같아요. 방문객(프론트엔드)은 이 이름표(URL)를 보고 올바른 사무실(엔드포인트)로 찾아가 필요한 서비스(기능)를 요청할 수 있습니다.

이 "문"을 통해 소통할 때 몇 가지 약속이 필요합니다:

*   **URL (주소)**: 각 기능에 접근할 수 있는 고유한 웹 주소입니다. 예를 들어 `/users`는 사용자 관련 기능, `/articles`는 게시글 관련 기능을 나타낼 수 있습니다.
*   **HTTP 메서드 (요청 방식)**: 어떤 종류의 작업을 할지 알려줍니다.
    *   `GET`: 정보 조회 (예: 게시글 목록 보기)
    *   `POST`: 새 정보 생성 (예: 새 게시글 작성, 회원가입)
    *   `PUT`: 기존 정보 수정 (예: 게시글 내용 변경)
    *   `DELETE`: 정보 삭제 (예: 게시글 삭제)
*   **요청 (Request)**: 프론트엔드가 백엔드로 보내는 데이터입니다. 여기에는 어떤 작업을 원하는지, 필요한 데이터는 무엇인지 등이 담겨 있습니다. (예: 회원가입 시 사용자 이름, 이메일, 비밀번호). 이 데이터의 구조는 [제1장: 공유 데이터 타입](01_공유_데이터_타입_.md)에서 정의한 타입과 밀접하게 관련됩니다.
*   **응답 (Response)**: 백엔드가 요청을 처리한 후 프론트엔드로 돌려주는 결과입니다. 성공 여부, 요청된 데이터, 오류 메시지 등이 포함될 수 있습니다. 이 또한 [제1장: 공유 데이터 타입](01_공유_데이터_타입_.md)의 약속을 따릅니다.

우리 `serverless-realworld-monorepo` 프로젝트의 백엔드는 **Java Spring Boot**라는 프레임워크를 사용하여 만들어졌습니다. Spring Boot는 이러한 API 엔드포인트를 쉽고 체계적으로 만들 수 있도록 도와줍니다. 여기서 "컨트롤러(Controller)"는 이러한 요청을 받아 처리하는 역할을 하는 Spring Boot의 구성 요소입니다.

## 백엔드 API 엔드포인트 살펴보기: 게시글 기능 예시 (`ArticlesController`)

가장 먼저 게시글과 관련된 요청을 처리하는 컨트롤러를 살펴보겠습니다. 이 코드는 `apps/backend/src/main/java/com/marcusmonteirodesouza/realworld/api/articles/controllers/ArticlesController.java` 파일에 있습니다.

### 1. 컨트롤러 클래스 정의

```java
// 파일: apps/backend/src/main/java/.../ArticlesController.java (일부)
package com.marcusmonteirodesouza.realworld.api.articles.controllers;

// ... 필요한 클래스들을 가져옵니다 (import) ...

@RestController // 이 클래스가 REST API 요청을 처리하는 특별한 클래스임을 선언
@RequestMapping("/articles") // 이 컨트롤러는 "/articles" 로 시작하는 URL 경로의 요청을 담당
public class ArticlesController {
    // 이 컨트롤러가 사용할 다른 서비스들 (예: ArticlesService)
    private final ArticlesService articlesService;
    // ... 다른 의존성들 ...

    // 생성자: 필요한 서비스들을 외부에서 받아와서 준비합니다.
    public ArticlesController(
            ArticlesService articlesService,
            /* ... */ ) {
        this.articlesService = articlesService;
        // ...
    }

    // 여기에 게시글 관련 API 엔드포인트 메서드들이 정의됩니다.
}
```

*   `@RestController`: "저는 REST API 요청을 처리하는 특별한 클래스예요!" 라고 Spring Boot에게 알려줍니다. REST API는 웹에서 데이터를 주고받는 표준적인 방식 중 하나입니다.
*   `@RequestMapping("/articles")`: "저는 `/articles`로 시작하는 모든 주소의 요청들을 담당할 거예요." 예를 들어, `/articles`, `/articles/my-first-post`, `/articles/my-first-post/comments` 등이 모두 이 컨트롤러와 관련될 수 있습니다.
*   `ArticlesService articlesService`: 컨트롤러는 실제 복잡한 작업(게시글 생성, 조회 등)을 직접 하지 않고, `ArticlesService` 같은 "전문가"에게 맡깁니다. 이에 대해서는 [제5장: 백엔드 핵심 서비스 로직](05_백엔드_핵심_서비스_로직_.md)에서 자세히 알아봅니다.

### 2. 새 게시글 작성 엔드포인트 (POST /articles)

사용자가 새 게시글을 작성하고 "발행" 버튼을 누르면, 프론트엔드는 이 엔드포인트로 게시글 데이터를 보냅니다.

```java
// 파일: apps/backend/src/main/java/.../ArticlesController.java (일부)
@PostMapping() // HTTP POST 요청이 "/articles"로 오면 이 메서드가 실행됩니다.
@ResponseStatus(HttpStatus.CREATED) // 성공적으로 생성되면 HTTP 상태 코드 201 (Created)을 반환합니다.
public ArticleResponse createArticle(@RequestBody CreateArticleRequest request)
        throws AlreadyExistsException {
    // 1. 현재 로그인한 사용자 정보 가져오기 (인증은 아래에서 간단히 설명)
    var maybeUserId = Optional.of(authenticationFacade.getAuthentication().getName());

    // 2. 요청받은 데이터(request)와 사용자 ID를 사용해 ArticlesService에 게시글 생성을 요청합니다.
    var article = articlesService.createArticle(
        new ArticleCreate(
            maybeUserId.get(),
            request.article.title,
            request.article.description,
            request.article.body,
            Optional.ofNullable(request.article.tagList)
        )
    );

    // 3. 작성자 프로필 정보 가져오기
    var authorProfile = profilesService.getProfile(article.getAuthorId(), maybeUserId);

    // 4. 생성된 게시글 정보와 작성자 프로필을 담아 ArticleResponse 형태로 응답합니다.
    return new ArticleResponse(maybeUserId, article, authorProfile);
}
```

*   `@PostMapping()`: 이 메서드가 `/articles` URL에 대한 HTTP POST 요청을 처리하도록 지정합니다.
*   `@ResponseStatus(HttpStatus.CREATED)`: 요청이 성공적으로 처리되어 새 게시글이 만들어지면, "201 Created"라는 HTTP 상태 코드를 응답으로 보냅니다. 이는 "요청 성공했고, 새 리소스가 생성되었음"을 의미합니다.
*   `@RequestBody CreateArticleRequest request`: 프론트엔드가 POST 요청의 몸통(body)에 담아 보낸 JSON 데이터를 `CreateArticleRequest`라는 객체로 변환하여 `request` 변수에 넣어줍니다. `CreateArticleRequest`는 게시글 제목, 설명, 본문, 태그 목록 등의 정보를 담고 있으며, 이는 [제1장: 공유 데이터 타입](01_공유_데이터_타입_.md)에서 정의한 `ArticleCreationRequest`와 매우 유사한 구조를 가집니다.
*   `articlesService.createArticle(...)`: 실제 게시글 생성 로직은 `ArticlesService`에 있습니다. 컨트롤러는 필요한 정보를 전달하고 결과를 받기만 합니다.
*   `return new ArticleResponse(...)`: 생성된 게시글 정보를 `ArticleResponse` 객체에 담아 프론트엔드로 반환합니다. `ArticleResponse` 역시 [제1장: 공유 데이터 타입](01_공유_데이터_타입_.md)에서 본 `ArticleResponse` (또는 그 안의 `Article` 타입)와 비슷한 구조로, 프론트엔드가 이해할 수 있는 형태로 데이터를 제공합니다.

### 3. 특정 게시글 조회 엔드포인트 (GET /articles/{slug})

블로그에서 특정 게시글 제목을 클릭하면, 해당 게시글의 상세 내용을 보여주는 페이지로 이동합니다. 이때 이 엔드포인트가 사용될 수 있습니다.

```java
// 파일: apps/backend/src/main/java/.../ArticlesController.java (일부)
@GetMapping("/{slug}") // HTTP GET 요청, URL 경로의 {slug} 부분은 변수로 사용됩니다.
public ArticleResponse getArticle(@PathVariable String slug) {
    // 현재 요청을 보낸 사용자 (로그인 안했을 수도 있음)
    var maybeUserId = Optional.ofNullable(authenticationFacade.getAuthentication().getName());

    // 1. URL에서 받은 slug 값을 이용해 ArticlesService에 특정 게시글 조회를 요청합니다.
    var article = articlesService.getArticleBySlug(slug).orElse(null);

    // 2. 만약 해당 slug의 게시글이 없다면, "찾을 수 없음" 오류를 발생시킵니다.
    if (article == null) {
        throw new NotFoundException("Article with slug '" + slug + "' not found");
    }

    // 3. 게시글 작성자 프로필 정보 가져오기
    var authorProfile = profilesService.getProfile(article.getAuthorId(), maybeUserId);

    // 4. 조회된 게시글 정보를 ArticleResponse 형태로 응답합니다.
    return new ArticleResponse(maybeUserId, article, authorProfile);
}
```

*   `@GetMapping("/{slug}")`: 이 메서드가 `/articles/` 다음에 오는 특정 문자열(예: `/articles/how-to-train-your-dragon`)에 대한 HTTP GET 요청을 처리하도록 합니다. `{slug}` 부분은 변수처럼 사용됩니다.
*   `@PathVariable String slug`: URL 경로의 `{slug}` 부분에 해당하는 실제 값(예: "how-to-train-your-dragon")을 `slug`라는 문자열 변수에 담아줍니다.
*   `articlesService.getArticleBySlug(slug)`: `slug`를 이용해 `ArticlesService`에서 해당 게시글을 찾아옵니다.
*   `throw new NotFoundException(...)`: 만약 게시글을 찾지 못하면, "404 Not Found" 오류를 프론트엔드로 보냅니다.
*   `return new ArticleResponse(...)`: 찾은 게시글 정보를 응답으로 보냅니다.

### 4. 게시글 목록 조회 엔드포인트 (GET /articles)

블로그 메인 페이지나 특정 조건(태그, 작성자)으로 게시글들을 필터링해서 보여줄 때 이 엔드포인트가 사용됩니다.

```java
// 파일: apps/backend/src/main/java/.../ArticlesController.java (일부)
@GetMapping() // HTTP GET 요청이 "/articles"로 오면 이 메서드가 실행됩니다.
public MultipleArticlesResponse listArticles(
        @RequestParam(required = false) String tag, // URL 쿼리 파라미터 ?tag=...
        @RequestParam(required = false) String author, // ?author=...
        @RequestParam(required = false) String favorited, // ?favorited=...
        @RequestParam(defaultValue = "20") Integer limit, // ?limit=... (기본값 20)
        @RequestParam(defaultValue = "0") Integer offset) { // ?offset=... (기본값 0)

    // ... (요청 파라미터를 사용하여 ArticlesService에 게시글 목록 조회를 요청하는 로직) ...
    // ... (조회된 목록을 MultipleArticlesResponse 형태로 가공) ...

    return new MultipleArticlesResponse(/* 조회된 게시글 목록 */);
}
```

*   `@GetMapping()`: `/articles` URL에 대한 HTTP GET 요청을 처리합니다.
*   `@RequestParam`: URL 주소 뒤에 `?`와 함께 오는 추가 정보들(쿼리 파라미터)을 받습니다.
    *   `String tag`: `?tag=java` 와 같이 특정 태그로 필터링할 때 사용됩니다. `required = false`는 이 파라미터가 없어도 된다는 의미입니다.
    *   `Integer limit`: `?limit=10` 과 같이 한 번에 가져올 게시글 수를 지정합니다. `defaultValue = "20"`은 `limit` 파라미터가 없으면 기본값으로 20을 사용한다는 뜻입니다.
    *   `Integer offset`: `?offset=0` 과 같이 몇 번째 게시글부터 가져올지 지정합니다. (페이징 처리)
*   `return new MultipleArticlesResponse(...)`: 여러 게시글 정보를 담은 `MultipleArticlesResponse` 객체를 응답으로 보냅니다.

## 백엔드 API 엔드포인트 살펴보기: 사용자 기능 예시 (`UsersController`)

이제 사용자 회원가입, 로그인 등 사용자 관련 기능을 처리하는 `UsersController`를 살펴보겠습니다. 이 코드는 `apps/backend/src/main/java/com/marcusmonteirodesouza/realworld/api/users/controllers/UsersController.java` 파일에 있습니다.

### 1. 회원가입 엔드포인트 (POST /users)

사용자가 회원가입 양식을 채우고 제출하면, 프론트엔드 API 라우트([제3장: 프론트엔드 API 라우트](03_프론트엔드_api_라우트_.md)에서 본 `/api/register`)는 이 백엔드 엔드포인트로 요청을 보낼 수 있습니다.

```java
// 파일: apps/backend/src/main/java/.../UsersController.java (일부)
@RestController // 이 클래스도 REST API 요청을 처리합니다.
public class UsersController {
    // ... UsersService 등 의존성 주입 ...

    @PostMapping("/users") // HTTP POST 요청이 "/users"로 오면 이 메서드가 실행됩니다.
    @ResponseStatus(HttpStatus.CREATED) // 성공 시 HTTP 201 상태 코드 반환
    public UserResponse registerUser(@RequestBody RegisterUserRequest request)
            throws AlreadyExistsException { // 이미 존재하는 사용자인 경우 예외 발생 가능

        // 1. 요청받은 정보(username, email, password)로 UsersService에 사용자 생성을 요청합니다.
        var user = usersService.createUser(
                request.user.username, request.user.email, request.user.password);

        // 2. 생성된 사용자로 로그인 토큰을 발급받습니다.
        var token = usersService.getToken(user.getUsername(), request.user.password);

        // 3. 생성된 사용자 정보와 토큰을 UserResponse 형태로 응답합니다.
        return new UserResponse(user, token);
    }

    // ... 로그인, 사용자 정보 조회/수정 등의 다른 엔드포인트들 ...
}
```

*   `@PostMapping("/users")`: `/users` URL에 대한 POST 요청을 처리합니다.
*   `@RequestBody RegisterUserRequest request`: 회원가입 폼에서 넘어온 `username`, `email`, `password` 정보를 `RegisterUserRequest` 객체로 받습니다. 이 객체의 구조는 [제1장: 공유 데이터 타입](01_공유_데이터_타입_.md)에서 정의한 `UserRegistrationRequest`와 일치합니다.
*   `usersService.createUser(...)`: 실제 사용자 생성 로직은 `UsersService`에 있습니다.
*   `usersService.getToken(...)`: 사용자 생성 후, 바로 로그인 처리를 위해 인증 토큰을 발급받습니다. 이 토큰은 프론트엔드로 전달되어 세션에 저장됩니다 ([제2장: 프론트엔드 사용자 액션 및 세션 관리](02_프론트엔드_사용자_액션_및_세션_관리_.md) 참고).
*   `return new UserResponse(user, token)`: 새로 생성된 사용자 정보와 인증 토큰을 `UserResponse` 객체에 담아 응답합니다. 이 또한 [제1장: 공유 데이터 타입](01_공유_데이터_타입_.md)의 `UserResponse`와 구조가 같습니다.

## 요청 처리 흐름: 백엔드는 어떻게 요청을 받을까요?

프론트엔드에서 백엔드 API 엔드포인트로 요청을 보내면 어떤 일이 일어날까요? 마치 편지를 보내는 과정과 비슷합니다.

1.  **편지 발송 (HTTP 요청)**: 프론트엔드(예: 웹 브라우저 또는 [제3장: 프론트엔드 API 라우트](03_프론트엔드_api_라우트_.md))가 백엔드 서버의 특정 주소(URL)로 편지(HTTP 요청)를 보냅니다. 편지에는 받는 사람 주소(URL), 보내는 방식(HTTP 메서드), 내용물(요청 데이터)이 적혀 있습니다.

2.  **우체국 도착 (백엔드 서버)**: 편지는 백엔드 서버(우리 프로젝트에서는 Spring Boot 애플리케이션)에 도착합니다.

3.  **중앙 안내 데스크 (DispatcherServlet)**: Spring Boot에는 "DispatcherServlet"이라는 아주 똑똑한 안내원이 있습니다. 이 안내원은 모든 요청을 제일 먼저 받고, 편지에 적힌 주소(URL)와 방식(HTTP 메서드)을 확인합니다.

4.  **담당 사무실과 담당자 연결 (컨트롤러와 메서드)**: 안내원은 확인한 정보를 바탕으로 어떤 컨트롤러(사무실)의 어떤 메서드(담당자)가 이 요청을 처리해야 하는지 찾아 연결해 줍니다. (예: `/articles` POST 요청은 `ArticlesController`의 `createArticle` 메서드!)

5.  **업무 처리 요청 (서비스 호출)**: 해당 컨트롤러 메서드는 요청 내용을 확인하고 (예: `@RequestBody`로 데이터 받기), 실제 복잡한 업무는 전문 부서인 서비스 계층([제5장: 백엔드 핵심 서비스 로직](05_백엔드_핵심_서비스_로직_.md))에 맡깁니다.

6.  **결과 보고 및 답장 준비 (응답 생성)**: 서비스 계층에서 업무를 마치고 결과를 돌려주면, 컨트롤러는 이 결과를 바탕으로 답장 편지(HTTP 응답)를 작성합니다. 답장에는 처리 결과(성공/실패 상태 코드), 요청한 데이터 또는 성공 메시지 등이 담깁니다.

7.  **답장 발송 (HTTP 응답)**: 컨트롤러는 작성된 답장을 다시 프론트엔드로 보냅니다.

이 과정을 간단한 그림으로 표현하면 다음과 같습니다:

```mermaid
sequenceDiagram
    participant 프론트엔드 (클라이언트)
    participant 백엔드 서버 (Spring Boot)
    participant 컨트롤러 (예: ArticlesController)
    participant 서비스 (예: ArticlesService)
    participant 데이터 접근 계층 (예: Repository)

    프론트엔드 (클라이언트)->>+백엔드 서버 (Spring Boot): HTTP 요청 (예: POST /articles, 게시글 데이터)
    백엔드 서버 (Spring Boot)->>+컨트롤러 (예: ArticlesController): 요청 전달 (URL, 메서드, 데이터 매핑)
    컨트롤러 (예: ArticlesController)->>+서비스 (예: ArticlesService): 서비스 메서드 호출 (예: createArticle(데이터))
    서비스 (예: ArticlesService)->>+데이터 접근 계층 (예: Repository): 데이터 저장/조회 요청
    데이터 접근 계층 (예: Repository)-->>-서비스 (예: ArticlesService): 처리 결과 반환
    서비스 (예: ArticlesService)-->>-컨트롤러 (예: ArticlesController): 서비스 결과 반환 (예: 생성된 게시글)
    컨트롤러 (예: ArticlesController)-->>-백엔드 서버 (Spring Boot): HTTP 응답 생성 (예: 201 Created, 게시글 정보)
    백엔드 서버 (Spring Boot)-->>-프론트엔드 (클라이언트): HTTP 응답 전송
```

## 인증은 어떻게 처리될까요?

몇몇 컨트롤러 메서드 코드에서 `authenticationFacade.getAuthentication().getName()` 같은 코드를 보셨을 겁니다.
```java
// 예시: ArticlesController의 createArticle 메서드 내부
var maybeUserId = Optional.of(authenticationFacade.getAuthentication().getName());
```
이는 "이 요청을 보낸 사용자가 누구인지 알려줘!" 라는 의미입니다.
프론트엔드에서 API를 요청할 때, 만약 사용자가 로그인한 상태라면 [제2장: 프론트엔드 사용자 액션 및 세션 관리](02_프론트엔드_사용자_액션_및_세션_관리_.md)에서 세션에 저장했던 **인증 토큰**을 요청 헤더(Header)에 함께 보냅니다. (이 과정은 [제3장: 프론트엔드 API 라우트](03_프론트엔드_api_라우트_.md)에서도 언급되었습니다.)

백엔드 서버는 이 토큰을 받아서 유효한지 검사하고, 토큰이 어떤 사용자의 것인지 확인합니다. 이 `authenticationFacade`가 바로 그 역할을 도와주는 도구입니다. 이를 통해 "이 게시글은 현재 로그인한 사용자 A가 작성했다" 또는 "이 댓글은 사용자 B만 삭제할 수 있다" 와 같은 권한 검사를 할 수 있게 됩니다.

인증과 보안에 대한 더 자세한 내용은 [제7장: 백엔드 인증 및 보안](07_백엔드_인증_및_보안_.md)에서 깊이 있게 다룰 예정입니다. 지금은 "컨트롤러가 요청을 보낸 사용자를 식별할 수 있구나" 정도로 이해하시면 충분합니다.

## 컨트롤러의 역할 정리

지금까지 살펴본 것처럼 백엔드 API 엔드포인트, 즉 컨트롤러는 다음과 같은 중요한 역할을 합니다:

*   외부(주로 프론트엔드)로부터 들어오는 **요청을 받는 관문** 역할을 합니다.
*   요청에 담긴 데이터(URL 파라미터, 쿼리 파라미터, 요청 본문 등)를 **추출하고 검증**합니다.
*   데이터의 형태를 [제1장: 공유 데이터 타입](01_공유_데이터_타입_.md)에서 정의한 것과 유사한 DTO(Data Transfer Object, 예: `CreateArticleRequest`, `UserResponse`)를 사용하여 주고받습니다.
*   실제 핵심적인 비즈니스 로직(데이터 처리, 계산 등)은 직접 수행하지 않고, **서비스 계층([제5장: 백엔드 핵심 서비스 로직](05_백엔드_핵심_서비스_로직_.md))에 위임**합니다. 컨트롤러는 지휘자처럼 어떤 서비스를 호출할지만 결정합니다.
*   서비스 계층으로부터 받은 결과를 바탕으로 프론트엔드에 전달할 **HTTP 응답(상태 코드, 데이터 등)을 만들어서 반환**합니다.

컨트롤러는 너무 많은 일을 하려고 하기보다는, 요청과 응답을 깔끔하게 관리하고 실제 작업은 다른 전문가(서비스)에게 맡기는 "교통 정리 담당자" 또는 "안내 데스크 직원"과 같다고 생각할 수 있습니다.

## 정리하며

이번 장에서는 `serverless-realworld-monorepo` 프로젝트의 백엔드 시스템에서 외부의 요청을 받아들이는 첫 번째 관문인 **백엔드 API 엔드포인트 (컨트롤러)**에 대해 알아보았습니다.

*   컨트롤러는 특정 **URL**과 **HTTP 메서드**의 조합으로 정의되며, 프론트엔드가 백엔드의 특정 기능에 접근할 수 있도록 하는 "문"입니다.
*   우리 프로젝트에서는 **Java Spring Boot**를 사용하여 `@RestController`, `@RequestMapping`, `@GetMapping`, `@PostMapping`, `@RequestBody`, `@PathVariable` 등의 어노테이션으로 이러한 엔드포인트를 쉽게 구현합니다.
*   컨트롤러는 요청을 받고, 필요한 데이터를 추출하며, 실제 비즈니스 로직은 **서비스 계층**으로 넘깁니다. 그리고 서비스의 처리 결과를 바탕으로 **HTTP 응답**을 생성하여 프론트엔드로 전달합니다.
*   이 과정에서 [제1장: 공유 데이터 타입](01_공유_데이터_타입_.md)에서 정의한 데이터 구조와 유사한 DTO를 사용하여 요청과 응답 데이터를 주고받으며, [제7장: 백엔드 인증 및 보안](07_백엔드_인증_및_보안_.md)과 관련된 사용자 인증 처리도 이루어집니다.

이제 프론트엔드의 요청이 백엔드의 어떤 "문"을 통해 들어오는지 알게 되었습니다. 그럼 이 문 안쪽에서는 어떤 일들이 벌어질까요? 컨트롤러가 요청을 전달하는 "실제 일꾼", 즉 애플리케이션의 핵심 두뇌 역할을 하는 부분은 어떻게 구성되어 있을까요?

다음 장에서는 바로 이 **백엔드의 핵심 로직**을 담당하는 부분에 대해 자세히 알아보겠습니다.

➡️ [제5장: 백엔드 핵심 서비스 로직](05_백엔드_핵심_서비스_로직_.md)

---

Generated by [AI Codebase Knowledge Builder](https://github.com/The-Pocket/Tutorial-Codebase-Knowledge)