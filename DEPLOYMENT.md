# XITA LDN 배포 가이드

## 🚀 웹 배포 옵션

Football Manager XITA LDN 선수 데이터베이스를 웹에서 접속 가능하도록 배포하는 3가지 방법입니다.

---

## 옵션 1: GitHub Pages (추천) ⭐

### 자동 배포 설정

1. **GitHub Repository 설정**으로 이동:
   - https://github.com/ArendtDEV/Claude_LDN/settings/pages

2. **GitHub Pages 활성화**:
   - "Source" 드롭다운에서 **"GitHub Actions"** 선택
   - 저장

3. **브랜치 병합** (선택사항):
   - 현재 브랜치 `claude/player-database-dashboard-011CUzTi1Zpr3p8CRutPhM5m`를 `main` 브랜치에 병합하면 자동으로 배포됩니다
   - Pull Request 생성: https://github.com/ArendtDEV/Claude_LDN/pull/new/claude/player-database-dashboard-011CUzTi1Zpr3p8CRutPhM5m

4. **수동 배포 트리거**:
   - GitHub Actions 탭으로 이동: https://github.com/ArendtDEV/Claude_LDN/actions
   - "Deploy to GitHub Pages" 워크플로우 선택
   - "Run workflow" 버튼 클릭
   - 브랜치 선택 후 실행

### 접속 URL
배포 완료 후 다음 URL로 접속:
```
https://arendtdev.github.io/Claude_LDN/
```

---

## 옵션 2: Vercel (빠르고 쉬움) 🚀

### 배포 방법

1. **Vercel 사이트 방문**: https://vercel.com

2. **GitHub 연동**:
   - "New Project" 클릭
   - GitHub 계정 연동
   - `ArendtDEV/Claude_LDN` 저장소 선택

3. **자동 설정**:
   - Vercel이 자동으로 `vercel.json` 설정 감지
   - 배포 시작

4. **접속**:
   - Vercel이 제공하는 URL로 즉시 접속 가능
   - 예: `https://claude-ldn-xxx.vercel.app`

### CLI로 배포 (터미널에서)
```bash
npx vercel --prod
```

---

## 옵션 3: Netlify (간단함) 🌐

### 배포 방법

1. **Netlify 사이트 방문**: https://netlify.com

2. **GitHub 연동**:
   - "Add new site" > "Import an existing project"
   - GitHub 계정 연동
   - `ArendtDEV/Claude_LDN` 저장소 선택

3. **자동 설정**:
   - Netlify가 자동으로 `netlify.toml` 설정 감지
   - 배포 시작

4. **접속**:
   - Netlify가 제공하는 URL로 즉시 접속 가능
   - 예: `https://claude-ldn-xxx.netlify.app`

### CLI로 배포 (터미널에서)
```bash
npx netlify deploy --prod
```

---

## 로컬 실행 (개발용)

로컬에서 바로 실행하려면:

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:5173 접속

---

## 📊 배포된 대시보드 기능

- ✅ 선수 데이터베이스 관리 (추가/수정/삭제)
- ✅ 대시보드: 주요 통계 및 차트
- ✅ 선수 검색 및 필터링
- ✅ 선수 상세 정보 및 능력치 시각화
- ✅ 브라우저 로컬 스토리지에 데이터 저장

---

## 🔧 문제 해결

### GitHub Pages가 404 오류를 표시하는 경우
- Repository Settings > Pages에서 GitHub Actions가 선택되었는지 확인
- Actions 탭에서 배포 워크플로우가 성공적으로 실행되었는지 확인

### Vercel/Netlify 배포 실패
- 저장소가 public인지 확인
- 빌드 로그 확인하여 오류 메시지 확인

---

## 📝 추가 정보

- 모든 배포 옵션은 **무료**로 사용 가능합니다
- 데이터는 브라우저의 Local Storage에 저장됩니다
- 각 사용자는 자신의 브라우저에 독립적인 데이터를 가집니다
