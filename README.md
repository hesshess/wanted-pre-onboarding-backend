# API Spec - Job Board
### [노션 버젼](https://www.notion.so/hessybessy/API-Spec-Job-Board-4f3af9fb0bf34a57b14b45aed39af2b5)

# Jobs // 채용공고

- `Job` Schema
    
    ```
    {
      id: int,  // 채용공고 아이디
      company_id: int // 회사 아이디
      position: string,  // 채용 포지션
      reward: int,  // 채용 보상금
      position_detail: text // 채용내용
      skills: string // 사용기술(프로그래밍 언어)
      created_at: Datetime, // 잡 생성 날짜
      updated_at: Datetime // 수정날짜
    }
    ```
    

# Users // 사용자

- user Schema
    
    ```
    {
    	id: int // 지원자 아이디
    	username: string // 지원자 이름
    	password: string // 비밀번호
    	email: string // 지원자 이메일
    	url: string // 지원자 이력서 링크
    }
    ```
    

# Companies // 채용기업

- company Schema
    
    ```
    {
    	id: int // 회사 아이디
    	name: string // 회사 이름
    	country: string // 근무나라
      city: string // 근무도시
    }
    ```
    

### `GET` /jobs

- get all jobs //채용공고 목록을 가져옵니다.
    
    Response `200`
    
    ```
    {
       [job, job ....] 
    }
    ```
    

### `GET` /jobs?search=:any

- get all jobs with related terms // 채용공고 검색 기능 구현
    
    Response `200`
    
    ```
    {
       [job, job ....] 
    }
    ```
    

### `GET` /jobs/:id

- get job by id //채용 상세 페이지를 가져옵니다.
    
    Response `200`
    
    ```
    {
       id: int,  // 채용공고 아이디
       company_id: string // 회사아이디
       position: string,  // 채용 포지션
       reward: int,  // 채용 보상금
       position_detail: text // 채용내용
       skills: string // 사용기술
       country: string // 근무나라
       city: string // 근무도시
       created_at: Datetime, // 잡 생성 날짜
       related_jobs:[채용공고_id, 채용공고_id, ..] // 회사가올린다른채용공고
    }
    ```
    

### `POST` /jobs

- creating new job // 채용공고를 등록합니다.
    
    Request 
    
    ```
    {
       company_id: string // 회사아이디
    	 position: string,  // 채용 포지션
    	 reward: int,  // 채용 보상금
    	 position_detail: text // 채용내용
    	 skills: string // 사용기술
    }
    ```
    
    Response `20`
    
    ```
    {
       job
    }
    ```
    

### `PUT` /jobs/:id

- updating job // 채용공고를 수정합니다.
    
    Request
    
    ```
    {
    	 position: string,  // 채용 포지션(optinal)
    	 reward: string,  // 채용 보상금(optinal)
    	 position_detail: text // 채용내용(optinal)
    	 skills: string // 사용기술(optinal)
       country: string // 근무나라(optinal)
       city: string // 근무도시(optinal)
    }
    ```
    
    Response `200`
    
    ```
    {
       job
    }
    ```
    

### `DELETE` /jobs/:id

- deleting job //채용공고를 삭제합니다.
    
    Response `204` 
    

# Apply // 지원

- apply Schema
    
    ```
    {
      job_id: int,  // 채용공고 아이디
      user_id: int, // 사용자 아이디
    }
    ```