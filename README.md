# Personal finance manager

## 목표

개인 자산 관리 웹-어플리케이션

## 개발환경

### 요구

[docker-for-mac](https://docs.docker.com/docker-for-mac/install/)

* docker engine >= 1.12.0
* docker compose >= 1.6.0
* python formatter: black

### 실행

```sh
# 레포 클론
git clone this_repo

# 컨테이너-네트워크-서비스 (재)실행
docker-compose up

# 도커이미지 변경 시 ex) requirements 추가
docker-compose build # 빌드
docker-compose up -d --build  # 빌드 후 서비스 재시작 + 백그라운드 모드

# 서비스 삭제
docker-compose down --volumn # 볼륨까지

# 실행 중 컨테이너 접속
docker-compose exec django /bin/bash
docker-compose exec django ./myproject/manage.py makemigrations # 명령어 실행
```

### 예정

* github action - CI/CD

### 고려

* [Django React Boilerplate](https://github.com/vintasoftware/django-react-boilerplate)

---
reference: [도커 컴포즈를 활용하여 완벽한 개발 환경 구성하기](https://github.com/raccoonyy/django-sample-for-docker-compose)
