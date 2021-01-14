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
docker-compose exec django ./backend/manage.py makemigrations # 명령어 실행

# 테스트 실행
docker-compose exec django ./backend/manage.py test
```

### 테스트 코드 
- 파일명 앞에 `test`를 붙여야 한다.
- 테스트 함수명 맨 앞에 `test`를 붙여야 한다. 
- 테스트 실행코드: `docker-compose exec django ./backend/manage.py test`

### 예정

* github action - CI/CD

### 고려

* [Django React Boilerplate](https://github.com/vintasoftware/django-react-boilerplate)

---
reference: [도커 컴포즈를 활용하여 완벽한 개발 환경 구성하기](https://github.com/raccoonyy/django-sample-for-docker-compose)


## zappa를 이용한 serverless API 구현

- `zappa`는 django, flask 등의 python 어플리케이션을 AWS lambda 서비스에 구현할 수 있도록 도와준다.
  - aws lambda부터 api gateway 설정까지 한번에 할 수 있다.
  
#### 가상환경 구성
- lambda에 올릴 어플리케이션이 돌아갈 수 있는 환경을 가상환경으로 만들어준다.
  - 참고: conda 환경을 사용하는 경우 제대로 안돌아갈 수 있다. `venv` 등을 통해 새로운 가상환경을 만들어야 한다.(~~환경만들기는 쉬울 수도, 고난의 길이 될 수도 있다~~)
  - 참고2: venv의 가상환경 실행 activate
   - 만들어진 가상환경 디렉토리에 있는 실행 파일을 직접 실행한다.
    - `$ source <project-dir-name>/bin/activate`
- **zappa 실행은 가상환경을 activate한 상태로, app의 최상위 디렉토리(manage.py가 있는)에서 한다.**    

#### AWS CLI 설정
- zappa는 결국 AWS 리소스를 이용하는 것이기 때문에 사용할 aws에 권한이 있는 AWS 계정 설정이 먼저 필요하다.
  - 사용하는 계정에 lambda나 api gateway 서비스에 대한 권한이 제대로 없으면 권한에러난다!(IAM 확인!) 
- awscli(파이썬 라이브러리)을 설치하고, aws configure에서 본인의 계정을 등록한다.
  - [awscli 문서](https://pypi.org/project/awscli/)
    - 명령줄로 aws를 쉽게 사용할 수 있도록 만들어놓은 파이썬 라이브러리다. 
  - 참고: [AWS 명령줄 인터페이스 공식문서](https://aws.amazon.com/ko/cli/) (~~친절하지 않고 무슨말인지 모를가능성이 크므로 그냥 참고만..~~)
 
#### zappa 설치

- `$ pip install zappa` 실행

#### init - 배포 설정

- `$ zappa init` 실행
  - 환경설정 항목들에 관련 질문이 나온다.
  - [참고문서](https://hidekuma.github.io/serverless/aws/lambda/apigateway/zappa/python-zappa/)
  - 질문에 모두 답하면 `zappa_settings.json` 설정파일이 생성된다.

#### 최초배포

- `$ zappa deploy`

#### 변경사항 배포

- `$ zappa update`

#### trouble shooting

- `.pyc` 파일은 모두 지워준다. 안지우고 deploy 실행 시 에러난다.
- DB로 `postgreSql` 사용 시 연결 라이브러리로 `psycopg2`가 사용되는데,
다른 라이브러리들과 달리 lambda에 올라갈 바이너리 파일이 자동으로 생성되지 않는다.
따라서 `psycopg2-binary`를 미리 설치해줘야한다.
  - `$ pip install psycopg2-binary`
