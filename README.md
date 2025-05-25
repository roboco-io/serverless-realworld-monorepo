# 서버리스 RealWorld 모노레포

![RealWorld](https://img.shields.io/badge/realworld-implemented-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> ### 모노레포 아키텍처를 사용한 RealWorld 명세의 서버리스 구현

이 코드베이스는 모노레포 구조와 서버리스 아키텍처를 사용하여 [RealWorld](https://github.com/gothinkster/realworld) 명세를 준수하는 풀스택 애플리케이션(프론트엔드 + 백엔드)을 포함하고 있습니다.

## 개요

이 프로젝트는 다음을 사용하여 현대적인 웹 애플리케이션을 구축하는 방법을 보여줍니다:

- **모노레포 아키텍처**: 프론트엔드와 백엔드 코드를 위한 단일 저장소
- **서버리스 백엔드**: 마이크로서비스 아키텍처가 적용된 AWS Lambda 함수
- **현대적인 프론트엔드**: Next.js 기반 프론트엔드 애플리케이션

이 애플리케이션은 "Medium 클론"으로도 알려진 RealWorld 명세를 구현하여 인증, 게시글 작성, 댓글, 사용자 프로필과 같은 기능을 갖춘 블로그 플랫폼의 실제 예를 제공합니다.

## 프로젝트 구조

```
monorepo/
├── apps/
│   ├── frontend/   # Next.js 프론트엔드 애플리케이션
│   └── backend/    # 서버리스 백엔드 서비스
├── packages/       # 공유 라이브러리 및 유틸리티
├── tools/          # 빌드 및 개발 도구
├── configs/        # 공유 설정 파일
└── docs/           # 프로젝트 문서
```

## 시작하기

### 사전 요구사항

- Node.js (v18 이상)
- Yarn (v1.22 이상)
- AWS CLI (백엔드 배포용)

### 설치

1. 저장소 복제:
   ```bash
   git clone https://github.com/roboco-io/serverless-realworld-monorepo.git
   cd serverless-realworld-monorepo
   ```

2. 의존성 설치:
   ```bash
   yarn install
   ```

### 개발

#### 프론트엔드 실행

```bash
yarn workspace frontend dev
```

프론트엔드는 http://localhost:3000 에서 접근할 수 있습니다.

#### 백엔드 로컬 실행

```bash
yarn workspace backend dev
```

백엔드 API는 http://localhost:4000 에서 접근할 수 있습니다.

### 테스트

모든 패키지와 애플리케이션에 대한 테스트 실행:

```bash
yarn test
```

또는 특정 워크스페이스 테스트:

```bash
yarn workspace frontend test
yarn workspace backend test
```

### 빌드

모든 패키지와 애플리케이션 빌드:

```bash
yarn build
```

## 배포

### 프론트엔드 배포

프론트엔드는 Vercel 또는 다른 정적 호스팅 서비스에 배포할 수 있습니다:

```bash
yarn workspace frontend build
yarn workspace frontend deploy
```

### 백엔드 배포

백엔드는 Serverless Framework를 사용하여 AWS에 배포됩니다:

```bash
yarn workspace backend deploy
```

## 문서

추가 문서는 `docs/` 디렉토리에서 확인할 수 있습니다:

- [프로젝트 계획](docs/project-plan.md) - 상세한 프로젝트 로드맵 및 구현 계획
- [모노레포 통합](docs/ideation.md) - 모노레포 구조 및 통합 접근 방식에 대한 정보
- **레거시 코드베이스 분석**:
  - [개요](docs/legacy-codebase-analysis/README.md) - 레거시 코드베이스 분석 소개
  - [01. 공유 데이터 타입](docs/legacy-codebase-analysis/01_공유_데이터_타입_.md) - 공유 데이터 타입 분석
  - [02. 프론트엔드 사용자 액션 및 세션 관리](docs/legacy-codebase-analysis/02_프론트엔드_사용자_액션_및_세션_관리_.md) - 프론트엔드 사용자 상호작용 분석
  - [03. 프론트엔드 API 라우트](docs/legacy-codebase-analysis/03_프론트엔드_api_라우트_.md) - 프론트엔드 API 라우트 분석
  - [04. 백엔드 API 엔드포인트 (컨트롤러)](docs/legacy-codebase-analysis/04_백엔드_api_엔드포인트__컨트롤러__.md) - 백엔드 API 컨트롤러 분석
  - [05. 백엔드 핵심 서비스 로직](docs/legacy-codebase-analysis/05_백엔드_핵심_서비스_로직_.md) - 백엔드 서비스 구현 분석
  - [06. 백엔드 데이터 모델 및 영속성](docs/legacy-codebase-analysis/06_백엔드_데이터_모델_및_영속성_.md) - 데이터 모델 및 데이터베이스 상호작용 분석
  - [07. 백엔드 인증 및 보안](docs/legacy-codebase-analysis/07_백엔드_인증_및_보안_.md) - 인증 메커니즘 분석

## 기여하기

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m '멋진 기능 추가'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다 - 자세한 내용은 LICENSE 파일을 참조하세요.

## 감사의 말

- 애플리케이션 명세를 제공한 [RealWorld](https://github.com/gothinkster/realworld)
- 서버리스 개발을 단순화한 [Serverless Framework](https://www.serverless.com/)
- 프론트엔드 프레임워크 [Next.js](https://nextjs.org/)
