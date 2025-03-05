import { configApp } from '@adonisjs/eslint-config'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'

export default [
  ...configApp({
    plugins: {
      'react': eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
    },
  }),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@unicorn/filename-case': 'off',
    },
  },
]
