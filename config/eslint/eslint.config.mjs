import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    prettierConfig,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        plugins: {
            import: importPlugin
        },
        settings: {
            'import/resolver': {
                typescript: {}
            }
        },
        rules: {
            '@typescript-eslint/consistent-type-exports': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-import-type-side-effects': 'error',
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type'
                    ]
                }
            ]
        }
    },
    {
        ignores: ['node_modules/', 'config/', 'dist']
    }
)
