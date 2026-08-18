module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    'vitest/globals': true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'vue',
    'html'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
      },
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        ['sibling', 'parent'],
        'index',
        'unknown'
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      }
    }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'warn',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'html/quotes': ['error', 'single'],
    'prefer-const': 'warn',
    'no-var': 'error',
    'no-implied-eval': 'error',
    'no-iterator-loop': 'error',
    'require-await': 'warn',
    'sort-imports': 'error'
  },
  overrides: [
    {
      files: ['**/*.test.{js,ts,tsx,vue}'],
      env: {
        'vitest/globals': true
      },
      rules: {
        'no-unused-expressions': 'off'
      }
    },
    {
      files: ['**/*.config.{js,ts}'],
      rules: {
        'no-console': 'off'
      }
    }
  ],
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    'coverage',
    'public',
    '*.min.js',
    'vendor'
  ]
};
