---
layout: home

hero:
  name: 'formtery'
  text: 'The foundation for complex React forms, built in the right way'
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /api/field

features:
  - title: End-to-End Type Safety
    details: Input types flow from `field()` through validators to the final submit handler. TypeScript instantly catches mismatches between what you accept, what you validate, and what you use.
  - title: Functional Validators
    details: Supports both sync and async validators, with first-class transformation and composition of validation results through FP-inspired monadic APIs.
  - title: Minimal Design
    details: One function `field()`, one hook `useForm()`, and one component `&lt;Controller&gt;`. Minimal API surface with flexibility that just works with your existing validators and schemas.
---
