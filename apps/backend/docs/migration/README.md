# Migration to AWS Serverless Microservices

이 문서는 기존 Spring Boot 모듈러 모놀리식 애플리케이션을 AWS Serverless 기반의 마이크로서비스 아키텍처로 전환하기 위한 계획을 정리한 것입니다. 전반적인 흐름과 단계별 작업을 요약하고, 세부 내용은 하위 문서에서 다룹니다.

## 목차

1. [아키텍처 설계](architecture.md)
2. [퍼시스턴스 레이어 전환](persistence-migration.md)
3. [IaC 및 CI/CD](iac-cicd.md)

## 단계별 마이그레이션 개요

1. **기존 구조 분석** – `users`, `profiles`, `articles` 모듈로 구성된 모놀리식 구조와 Keycloak, PostgreSQL 사용 현황 파악
2. **서비스 경계 정의** – 각 모듈을 독립된 마이크로서비스(Users, Profiles, Articles)로 분리하고 인증은 Cognito로 대체
3. **코드 분리 및 리팩터링** – 공통 라이브러리를 유지하되 Lambda 실행을 위해 모듈별로 경량화
4. **데이터베이스 분리 및 이전** – PostgreSQL 기반 JPA 엔티티를 DynamoDB 테이블로 전환
5. **Lambda 함수 구현** – 서비스별 API 엔드포인트를 Lambda로 작성하고 API Gateway로 라우팅
6. **데이터 마이그레이션** – 기존 DB 데이터를 새 DynamoDB 테이블로 이전
7. **CI/CD와 인프라** – AWS CDK로 인프라를 정의하고 GitHub Actions로 배포 파이프라인 구성
8. **테스트 및 점진적 전환** – 기능별 테스트 후 트래픽을 단계적으로 전환

각 단계의 세부 설명과 고려 사항은 하위 문서를 참고하세요.

