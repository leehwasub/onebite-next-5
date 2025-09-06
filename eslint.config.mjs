import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // TypeScript 관련 규칙 완화
      "@typescript-eslint/no-unused-vars": "warn", // error에서 warn으로
      "@typescript-eslint/no-explicit-any": "warn", // any 타입 사용 허용 (warn만)
      "@typescript-eslint/ban-ts-comment": "warn", // @ts-ignore 등 허용 (warn만)
      
      // React 관련 규칙 완화
      "react/no-unescaped-entities": "off", // 따옴표, 아포스트로피 등 허용
      "react-hooks/exhaustive-deps": "warn", // useEffect 의존성 배열 경고만
      
      // Next.js 관련 규칙 완화
      "@next/next/no-img-element": "warn", // img 태그 사용 허용 (warn만)
      "@next/next/no-html-link-for-pages": "warn",
      
      // 일반 JavaScript/TypeScript 규칙 완화
      "no-console": "warn", // console.log 허용 (warn만)
      "no-debugger": "warn", // debugger 허용 (warn만)
      "prefer-const": "warn", // let 대신 const 권장만
      "no-var": "warn", // var 사용 권장하지 않음 (warn만)
      
      // 코드 스타일 관련 완화
      "semi": "off", // 세미콜론 강제하지 않음
      "quotes": "off", // 따옴표 스타일 강제하지 않음
      "comma-dangle": "off", // trailing comma 강제하지 않음
      
      // 접근성 관련 완화 (개발 중에만)
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },
];

export default eslintConfig;
