import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/formtery/',
  title: 'formtery',
  description: 'The foundation for complex form UIs, built in the right way',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/field' },
    ],
    outline: 'deep',
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Validation', link: '/guide/validation' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          {
            text: 'Fields',
            items: [
              { text: 'field()', link: '/api/field' },
              { text: '&lt;Field&gt;', link: '/api/field-component' },
              { text: 'useField()', link: '/api/useField' },
              { text: 'useFieldInput()', link: '/api/useFieldInput' },
            ],
          },
          {
            text: 'Form',
            items: [{ text: 'useForm()', link: '/api/useForm' }],
          },
          {
            text: 'Validation',
            items: [
              { text: 'v.fn', link: '/api/v-fn' },
              { text: 'v.asyncFn', link: '/api/v-asyncFn' },
              { text: 'v.result', link: '/api/v-result' },
              { text: 'Built-in Validators', link: '/api/v-built-in' },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/g6123/formtery' }],
  },
});
