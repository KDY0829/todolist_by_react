# 📝 React Todo List

반복 일정 / 중요도 / 날짜·시간 관리 / 라이트·다크 테마 토글을 지원하는 **React 기반 Todo List**입니다.

직관적인 UI, 컴포넌트 분리, 상태 관리, 사용자 경험까지 고려한 개인 프로젝트용 Todo 애플리케이션입니다.

---

## 🚀 데모 화면

(스크린샷 추가 예정)

---

## ✨ 주요 기능

### ✅ 1. 할 일 추가 / 수정 / 삭제

- 내용 입력
- 중요도(High / Medium / Low) 선택
- 날짜 및 시간 설정
- 수정 시 기존 값 자동 로드

---

### 🔁 2. 반복 일정 기능

- **반복 없음**
- **매일 반복**
- **매주 특정 요일 반복** (월~일 요일 선택 가능)

다음 실행 날짜는 자동으로 계산됩니다.

---

### 🌗 3. 라이트 / 다크 모드 토글

- 상단 버튼으로 테마 즉시 전환
- localStorage 저장 → 새로고침 후에도 유지
- 시스템 테마(prefers-color-scheme) 자동 적용

---

### 🎨 4. 중요도에 따른 색상 표시

| 중요도 | 색상      |
| ------ | --------- |
| HIGH   | 🔴 빨간색 |
| MEDIUM | 🟡 주황색 |
| LOW    | 🟢 초록색 |

---

### 💾 5. 로컬 스토리지 저장

앱을 닫았다 열어도 모든 Todo가 유지됩니다.

---

## 📂 프로젝트 구조

```
src/
  App.jsx
  main.jsx
  index.css

  utils/
    storage.js
    repeat.js
    theme.js

  pages/
    TodoPage.jsx

  components/
    TodoEditor.jsx
    TodoList.jsx
    TodoItem.jsx
    ThemeToggle.jsx
```

---

## 🛠 기술 스택

- **React 18**
- **Vite**
- **JavaScript (ES6+)**
- **CSS Variables 기반 테마 시스템**
- **localStorage**
- **Date() API 계산 기반 반복 일정 로직**

---

## 📦 설치 및 실행

### 1) 프로젝트 설치

```bash
git clone https://github.com/USERNAME/REPO.git
cd REPO
npm install
```

### 2) 개발 서버 실행

```bash
npm run dev
```

### 3) 빌드

```bash
npm run build
```

---

## 📘 반복 일정 로직 소개

### 🕒 매일 반복

```js
repeatEveryDay(baseTime, "09:00");
```

### 📅 매주 반복

```js
repeatEveryWeek(baseTime, [1, 3, 5], "09:00");
// 월(1), 수(3), 금(5)
```

반복 일정은 체크 완료 시 done 처리 대신  
→ **다음 예정일로 자동 이동됩니다.**

---

## 🎨 테마 시스템 구조

### CSS 변수 기반 테마

```css
:root {
  --bg: #0f172a;
  --fg: #e2e8f0;
}

:root[data-theme="light"] {
  --bg: #f8fafc;
  --fg: #0f172a;
}
```

### 테마 토글

```js
<button onClick={toggleTheme}>
  {theme === "light" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
</button>
```

---

## 📄 라이선스

MIT License
