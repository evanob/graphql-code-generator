# @graphql-codegen/typescript-react-apollo

## 2.2.7

### Patch Changes

- Updated dependencies [6aaecf1c]
  - @graphql-codegen/visitor-plugin-common@1.21.2

## 2.2.6

### Patch Changes

- 0c989a9a: Fix missing use of type import when using custom apollo hooks import
- 34c37992: No longer use TypesSuffix on function names.
- Updated dependencies [cf1e5abc]
  - @graphql-codegen/visitor-plugin-common@1.21.1

## 2.2.5

### Patch Changes

- Updated dependencies [dfd25caf]
- Updated dependencies [8da7dff6]
  - @graphql-codegen/visitor-plugin-common@1.21.0
  - @graphql-codegen/plugin-helpers@1.18.7

## 2.2.4

### Patch Changes

- d9212aa0: fix(visitor-plugin-common): guard for a runtime type error
- Updated dependencies [d9212aa0]
- Updated dependencies [f0b5ea53]
- Updated dependencies [097bea2f]
  - @graphql-codegen/visitor-plugin-common@1.20.0
  - @graphql-codegen/plugin-helpers@1.18.5

## 2.2.3

### Patch Changes

- 23862e7e: fix(naming-convention): revert and pin change-case-all dependency for workaround #3256
- Updated dependencies [23862e7e]
  - @graphql-codegen/visitor-plugin-common@1.19.1
  - @graphql-codegen/plugin-helpers@1.18.4

## 2.2.2

### Patch Changes

- 29b75b1e: enhance(namingConvention): use change-case-all instead of individual packages for naming convention
- Updated dependencies [e947f8e3]
- Updated dependencies [29b75b1e]
- Updated dependencies [d4942d04]
- Updated dependencies [1f6f3db6]
- Updated dependencies [29b75b1e]
  - @graphql-codegen/visitor-plugin-common@1.19.0
  - @graphql-codegen/plugin-helpers@1.18.3

## 2.2.1

### Patch Changes

- 1183d173: Bump all packages to resolve issues with shared dependencies
- Updated dependencies [1183d173]
  - @graphql-codegen/visitor-plugin-common@1.17.20
  - @graphql-codegen/plugin-helpers@1.18.2

## 2.2.0

### Minor Changes

- bd3bd296: Improve DocumentNode optimizations, to reduce bundle size when consumed as pre-compiled

### Patch Changes

- Updated dependencies [99819bf1]
- Updated dependencies [c3b59e81]
  - @graphql-codegen/visitor-plugin-common@1.17.19

## 2.1.1

### Patch Changes

- b31ce77e: prevent baseOptions from being required when Mutation is used

## 2.1.0

### Minor Changes

- 9f2a4e2f: Improved type-safety: in generated React Hooks, `baseOptions` will be non-optional in case there when there is a required variables with no default value

### Patch Changes

- Updated dependencies [612e5e52]
- Updated dependencies [9f2a4e2f]
- Updated dependencies [0f35e775]
- Updated dependencies [eaf45d1f]
  - @graphql-codegen/visitor-plugin-common@1.17.17
  - @graphql-codegen/plugin-helpers@1.18.1

## 2.0.7

### Patch Changes

- f603b8f8: Support unnamed queries in operation visitors
- Updated dependencies [d2cde3d5]
- Updated dependencies [89a6aa80]
- Updated dependencies [f603b8f8]
- Updated dependencies [da8bdd17]
  - @graphql-codegen/visitor-plugin-common@1.17.15
  - @graphql-codegen/plugin-helpers@1.17.9

## 2.0.6

### Patch Changes

- 1d7c6432: Bump all packages to allow "^" in deps and fix compatibility issues
- 1d7c6432: Bump versions of @graphql-tools/ packages to fix issues with loading schemas and SDL comments
- ac067ea0: Improve output reliability by using separate import for gql tag, ensuring it will be there also for fragments when presets are used. This will bring back the separate import for gql tag (and remove the aliased one)
- Updated dependencies [1d7c6432]
- Updated dependencies [1d7c6432]
  - @graphql-codegen/visitor-plugin-common@1.17.13
  - @graphql-codegen/plugin-helpers@1.17.8

## 2.0.5

### Patch Changes

- 2c3f0728: prevent adding aliased gql tag when documentMode is set to "external"
- Updated dependencies [4266a15f]
  - @graphql-codegen/visitor-plugin-common@1.17.12

## 2.0.4

### Patch Changes

- ee2b01a3: Fixes for issues with publish command
- Updated dependencies [ee2b01a3]
  - @graphql-codegen/visitor-plugin-common@1.17.11

## 2.0.3

### Patch Changes

- 6cb9c96d: Fixes issues with previous release
- Updated dependencies [6cb9c96d]
  - @graphql-codegen/visitor-plugin-common@1.17.10

## 2.0.2

### Patch Changes

- bccfd28c: Enforce `.tsx` extension only when withComponent: true is set
- e6ad5398: apollo v3 should not use type import
- bccfd28c: Use gql as-is instead of Apollo.gql for the generated graphql-tag, to make sure it's compatible with IDEs and prettier
- Updated dependencies [bccfd28c]
  - @graphql-codegen/visitor-plugin-common@1.17.9

## 2.0.1

### Patch Changes

- ce3a5798: Publish minor version to include fixes for client-side-base-visitor, required to v2 of ts-react-apollo plugin (for unified apollo import)
- Updated dependencies [ce3a5798]
  - @graphql-codegen/visitor-plugin-common@1.17.8

## 2.0.0

### Major Changes

- 091dfeae: Support Apollo-Client v3 by default (instead of v2), and generate React Hooks be default. HOC and Components are now disabled by default.

  Apollo Client v3 has React support integrated as part of the core package now, so that means that some imports, identifiers and usage should be updated. [You can read more about migrating to Apollo-Client v3 here](https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration/)

  That means that imports are now generated from `@apollo/client` package, including `gql` tag. React Hooks are generated by default, and HOC and Components are not generated.

  ## Migration Notes

  If you are still using the [deprecated](https://github.com/apollographql/react-apollo) `react-apollo` package, please set this configuration:

  ```yaml
  config:
    reactApolloVersion: 2
  ```

  If you are still using the generated React HOC, please set this additional configuration:

  ```yaml
  config:
    reactApolloVersion: 2
    withHOC: true
  ```

  If you are still using the generated React Components, please set this additional configuration:

  ```yaml
  config:
    reactApolloVersion: 2
    withComponent: true
  ```

  If you don't need the generated React Hooks (turned on by default now), please also set:

  ```yaml
  config:
    withHooks: false
  ```
