import { RawClientSideBasePluginConfig } from '@graphql-codegen/visitor-plugin-common';

/**
 * @description This plugin generates `urql` (https://github.com/FormidableLabs/urql) components and HOC with TypeScript typings.
 */
export interface UrqlRawPluginConfig extends RawClientSideBasePluginConfig {
  /**
   * @description Customized the output by enabling/disabling the generated Component.
   * @default false
   */
  withComponent?: boolean;
  /**
   * @description Customized the output by enabling/disabling the generated React Hooks.
   * @default true
   *
   */
  withHooks?: boolean;
  /**
   * @description You can specify module that exports components `Query`, `Mutation`, `Subscription` and HOCs
   * This is useful for further abstraction of some common tasks (eg. error handling).
   * Filepath relative to generated file can be also specified.
   * @default urql
   */
  urqlImportFrom?: string;
  /**
   * @description Customized the output by enabling/disabling the use of hooks authenticated using
   * Auth0. When this flag is enabled, the use<Named>Query hook will be `paused: true` by default
   * whenever `isAuthenticated` (from `useAuth0`) is false. The original hook of the same name will
   * be aliased as `useUnauthenticated<Named>Query`.
   * This is useful only when `withHooks` config is enabled too.
   * @default false
   */
  withAuth0?: boolean;
}
