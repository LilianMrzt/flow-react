module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'import'
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended'
    ],
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        'react/prop-types': 'off',
        'object-curly-spacing': ['error', 'always'],
        'quotes': ['error', 'single', { avoidEscape: true }],
        'semi': ['error', 'never'],
        'arrow-body-style': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'space-infix-ops': 'error',
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
        'arrow-spacing': ['error', { before: true, after: true }],
        'brace-style': ['error', '1tbs', { allowSingleLine: false }],
        'no-multi-spaces': ['error'],
        'space-before-blocks': ['error', { functions: 'never', keywords: 'always', classes: 'always' }],
        'import/no-unresolved': 'off',
        'no-duplicate-imports': ['error', { includeExports: true }],
        '@typescript-eslint/explicit-function-return-type': ['error', {
            allowExpressions: false,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true
        }],
        '@typescript-eslint/typedef': ['error', {
            variableDeclaration: false,
            variableDeclarationIgnoreFunction: false,
            memberVariableDeclaration: true,
            parameter: false,
            propertyDeclaration: true
        }],
        '@typescript-eslint/explicit-module-boundary-types': 'error'
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                indent: ['error', 4]
            }
        }
    ]
}
