# 퍼시스턴스 레이어 전환

기존 애플리케이션은 JPA 기반으로 PostgreSQL에 데이터를 저장합니다. 마이크로서비스화와 함께 NoSQL인 DynamoDB를 사용하도록 변경합니다.

## 기존 주요 엔티티

- **Article**: id, authorId, slug, title, description, body, createdAt, updatedAt, tagList, favorites, comments
- **Comment**: id, authorId, body, article, createdAt, updatedAt
- **Favorite**: id, userId, article, createdAt
- **Tag**: id, value, articles
- **Follow**: id, followerId, followedId, createdAt

## DynamoDB 설계안

서비스별로 다음과 같이 테이블을 생성합니다.

- `Users` 테이블 – Cognito 사용자 속성 외에 필요시 추가 정보를 저장
- `Profiles` 테이블 – 팔로우 관계(`Follow`)를 파티션 키와 정렬 키 조합으로 저장
- `Articles` 테이블 – 게시글(`Article`)을 기본 항목으로 두고 `Comments`, `Favorites`, `Tags`를 GSI 혹은 별도 테이블로 분리

각 테이블의 정확한 파티션 키 및 인덱스 설계는 사용 패턴을 고려하여 세부 조정이 필요합니다.

## 마이그레이션 절차

1. DynamoDB 테이블 스키마 정의 및 생성 (CDK 활용)
2. PostgreSQL에서 각 엔티티 데이터를 추출하여 변환 스크립트를 통해 DynamoDB로 적재
3. 서비스 코드에서 JPA 의존성을 제거하고 DynamoDB SDK를 사용하도록 리포지토리 레이어 수정
4. 데이터 일관성 검증 후 기존 데이터베이스는 읽기 전용으로 전환하고 최종 스위칭

