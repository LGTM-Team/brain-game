// 📦 ESLint 공식 JavaScript 추천 규칙 모음 (기본적인 JS 문법 오류 탐지 등 포함)
import js from "@eslint/js";

// 🌐 브라우저 및 Node 환경에서 사용 가능한 전역 변수들을 정의 (window, document, process 등)
import globals from "globals";

// 🔠 TypeScript용 ESLint 통합 설정 도구 (Flat Config에서 parser, recommended 룰 등 제공)
import tseslint from "typescript-eslint";

// ⚛️ React 컴포넌트를 위한 ESLint 플러그인 (JSX 문법, prop-type 검사 등)
import pluginReact from "eslint-plugin-react";

// 💅 Prettier와 충돌되는 ESLint 룰들을 비활성화해주는 설정 (형식 관련 오류 방지용)
import prettier from "eslint-config-prettier";

// 🛠️ Flat Config용 ESLint 설정을 정의하는 함수 (기존 `.eslintrc`의 대체 방식)
import { defineConfig } from "eslint/config";

// 🧾 ESLint 설정 본문 시작 — defineConfig로 배열 형태의 설정을 반환
export default defineConfig([

  // 📁 공통 파일 확장자에 적용할 기본 설정 정의
  {
    // 이 설정을 적용할 파일들 (js/ts/tsx 등 거의 모든 JS/TS 변형 포함)
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    // 사용할 ESLint 플러그인 등록 (이 경우 @eslint/js → 기본 JS 룰)
    plugins: { js },

    // 언어 분석 관련 옵션 설정
    languageOptions: {
      // TypeScript 코드 분석을 위한 parser 지정
      parser: tseslint.parser,

      // 최신 ECMAScript 문법 + 모듈 시스템 + JSX 활성화
      parserOptions: {
        ecmaVersion: "latest",       // 최신 JS 문법 지원 (ES2023 등)
        sourceType: "module",        // ES 모듈 시스템 사용 (import/export)
        ecmaFeatures: {
          jsx: true,                 // JSX 문법 지원 (React)
        },
      },

      // 브라우저 및 Node 환경의 전역 변수 자동 정의
      globals: {
        ...globals.browser, // window, document 등
        ...globals.node,    // process, __dirname 등
      },
    },

    // 코드 스타일/버그 관련 룰 설정
    rules: {
      // prettier와 충돌되는 ESLint 규칙 자동 비활성화
      ...prettier.rules,
    },

    // ESLint가 무시할 경로 설정
    ignores: ["node_modules", "dist"], // 라이브러리, 빌드 결과물 제외
  },

  // ✅ typescript-eslint가 제공하는 추천 설정들 적용
  ...tseslint.configs.recommended,

  // ✅ React용 Flat Config 추천 규칙 적용 (JSX 사용 시 필수)
  pluginReact.configs.flat.recommended,
]);
