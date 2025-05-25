/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // 기본 규칙
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',

    // TypeScript 규칙
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // React 규칙
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    // 테스트 파일에 대한 규칙 재정의
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      env: {
        jest: true,
      },
    },
    // Node.js 환경 파일에 대한 규칙 재정의
    {
      files: ['*.js', 'configs/**/*.js', '**/tailwind.config.ts'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    // Next.js 프론트엔드 파일에 대한 규칙 재정의
    {
      files: ['apps/frontend/**/*.{ts,tsx}'],
      rules: {
        // Next.js에서는 console 사용을 허용하되, 개발 환경에서만 허용
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        // any 타입 사용을 경고로 낮춤
        '@typescript-eslint/no-explicit-any': 'warn',
        // 빈 인터페이스 허용
        '@typescript-eslint/no-empty-object-type': 'warn',
        // 사용하지 않는 변수에 대해 경고로 낮춤
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_|err|error|e' }],
        // 사용하지 않는 표현식 허용
        '@typescript-eslint/no-unused-expressions': 'warn',
        // React Hook 의존성 경고로 낮춤
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  ],
};
