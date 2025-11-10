# XITA LDN - Football Manager Player Database

Football Manager용 선수 데이터베이스 관리 시스템입니다. XITA LDN 구단의 선수들을 효율적으로 관리할 수 있는 대시보드 애플리케이션입니다.

## 기능

### Dashboard
- 전체 선수 수, 평균 나이, 총 시장 가치, 평균 능력치 등 주요 통계 표시
- 포지션별 선수 분포 차트
- 스쿼드 개요 정보

### 선수 관리 (Player Management)
- 선수 목록 조회 (검색 및 필터링)
- 선수 상세 정보 보기
- 선수 추가/수정/삭제
- 선수 능력치 시각화 (레이더 차트)

### 선수 정보
- 기본 정보: 이름, 나이, 국적, 포지션, 등번호
- 신체 정보: 키, 몸무게, 주발
- 계약 정보: 시장 가치, 주급
- 능력치: Current Ability, Potential
- 상세 능력치:
  - Technical (기술): 코너킥, 크로스, 드리블, 슈팅, 퍼스트 터치 등
  - Mental (정신): 침착성, 예측력, 결단력, 시야, 리더십 등
  - Physical (신체): 가속력, 민첩성, 스피드, 스태미나, 힘 등

## 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Data Storage**: Local Storage (브라우저)

## 설치 및 실행

### 필수 요구사항
- Node.js 18 이상

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:5173 으로 접속

### 프로덕션 빌드
```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 빌드 미리보기
```bash
npm run preview
```

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Dashboard.tsx   # 대시보드 페이지
│   ├── PlayerList.tsx  # 선수 목록
│   ├── PlayerDetail.tsx # 선수 상세 정보
│   └── PlayerForm.tsx  # 선수 추가/수정 폼
├── services/           # 비즈니스 로직
│   └── playerService.ts # 선수 데이터 관리
├── types/              # TypeScript 타입 정의
│   └── Player.ts       # 선수 관련 타입
├── App.tsx             # 메인 앱 컴포넌트
└── main.tsx            # 앱 진입점
```

## 사용 방법

1. **Dashboard**: 왼쪽 상단의 "Dashboard" 버튼을 클릭하여 전체 통계를 확인
2. **Players**: "Players" 버튼을 클릭하여 선수 목록 확인
3. **선수 추가**: Players 페이지에서 "Add Player" 버튼 클릭
4. **선수 검색**: 검색창에 이름, 포지션, 국적으로 검색
5. **선수 필터링**: 포지션 드롭다운으로 특정 포지션 선수만 필터링
6. **선수 상세 보기**: 선수 카드의 눈 아이콘(👁️) 클릭
7. **선수 수정**: 선수 카드의 연필 아이콘(✏️) 클릭
8. **선수 삭제**: 선수 카드의 휴지통 아이콘(🗑️) 클릭

## 데이터 저장

모든 데이터는 브라우저의 Local Storage에 저장됩니다. 브라우저 데이터를 지우면 저장된 선수 정보도 삭제됩니다.

## 라이선스

MIT
