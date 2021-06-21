import {
  ClientSideBaseVisitor,
  ClientSideBasePluginConfig,
  LoadedFragment,
  getConfigValue,
  OMIT_TYPE,
} from '@graphql-codegen/visitor-plugin-common';
import { UrqlRawPluginConfig } from './config';
import autoBind from 'auto-bind';
import { OperationDefinitionNode, Kind, GraphQLSchema } from 'graphql';
import { pascalCase } from 'change-case-all';

export interface UrqlPluginConfig extends ClientSideBasePluginConfig {
  withComponent: boolean;
  withHooks: boolean;
  urqlImportFrom: string;
  withAuth0: boolean;
}

export class UrqlVisitor extends ClientSideBaseVisitor<UrqlRawPluginConfig, UrqlPluginConfig> {
  constructor(schema: GraphQLSchema, fragments: LoadedFragment[], rawConfig: UrqlRawPluginConfig) {
    super(schema, fragments, rawConfig, {
      withAuth0: getConfigValue(rawConfig.withAuth0, false),
      withComponent: getConfigValue(rawConfig.withComponent, false),
      withHooks: getConfigValue(rawConfig.withHooks, true),
      urqlImportFrom: getConfigValue(rawConfig.urqlImportFrom, null),
    });

    autoBind(this);
  }

  public getImports(): string[] {
    const baseImports = super.getImports();
    const imports = [];
    const hasOperations = this._collectedOperations.length > 0;

    if (!hasOperations) {
      return baseImports;
    }

    if (this.config.withComponent) {
      imports.push(`import * as React from 'react';`);
    }

    if (this.config.withComponent || this.config.withHooks) {
      imports.push(`import * as Urql from '${this.config.urqlImportFrom || 'urql'}';`);
    }

    if (this.config.withAuth0 && this.config.withHooks) {
      imports.push(`import { useAuth0 } from '@evanob/auth0-react';`);
    }

    imports.push(OMIT_TYPE);

    return [...baseImports, ...imports];
  }

  private _buildComponent(
    node: OperationDefinitionNode,
    documentVariableName: string,
    operationType: string,
    operationResultType: string,
    operationVariablesTypes: string
  ): string {
    const componentName: string = this.convertName(node.name?.value ?? '', {
      suffix: 'Component',
      useTypesPrefix: false,
    });

    const isVariablesRequired =
      operationType === 'Query' &&
      node.variableDefinitions.some(variableDef => variableDef.type.kind === Kind.NON_NULL_TYPE);

    const generics = [operationResultType, operationVariablesTypes];

    if (operationType === 'Subscription') {
      generics.unshift(operationResultType);
    }
    return `
export const ${componentName} = (props: Omit<Urql.${operationType}Props<${generics.join(
      ', '
    )}>, 'query'> & { variables${isVariablesRequired ? '' : '?'}: ${operationVariablesTypes} }) => (
  <Urql.${operationType} {...props} query={${documentVariableName}} />
);
`;
  }

  private _buildHooks(
    node: OperationDefinitionNode,
    operationType: string,
    documentVariableName: string,
    operationResultType: string,
    operationVariablesTypes: string
  ): string {
    const operationName: string = this.convertName(node.name?.value ?? '', {
      suffix: this.config.omitOperationSuffix ? '' : pascalCase(operationType),
      useTypesPrefix: false,
    });

    if (operationType === 'Mutation') {
      return `
export function use${operationName}() {
  return Urql.use${operationType}<${operationResultType}, ${operationVariablesTypes}>(${documentVariableName});
};`;
    }

    if (operationType === 'Subscription') {
      return `
export function use${operationName}<TData = ${operationResultType}>(options: Omit<Urql.Use${operationType}Args<${operationVariablesTypes}>, 'query'> = {}, handler?: Urql.SubscriptionHandler<${operationResultType}, TData>) {
  return Urql.use${operationType}<${operationResultType}, TData, ${operationVariablesTypes}>({ query: ${documentVariableName}, ...options }, handler);
};`;
    }

    if (this.config.withAuth0) {
      return `
export function useUnauthenticated${operationName}(options: Omit<Urql.Use${operationType}Args<${operationVariablesTypes}>, 'query'> = {}) {
  return Urql.use${operationType}<${operationResultType}>({ query: ${documentVariableName}, ...options });
};
export function use${operationName}(options: Omit<Urql.Use${operationType}Args<${operationVariablesTypes}>, 'query'> = {}) {
  const { isAuthenticated } = useAuth0()
  return Urql.use${operationType}<${operationResultType}>({
    query: ${documentVariableName},
    paused: !isAuthenticated,
    ...options
  });
};`;
    }

    return `
export function use${operationName}(options: Omit<Urql.Use${operationType}Args<${operationVariablesTypes}>, 'query'> = {}) {
  return Urql.use${operationType}<${operationResultType}>({ query: ${documentVariableName}, ...options });
};`;
  }

  protected buildOperation(
    node: OperationDefinitionNode,
    documentVariableName: string,
    operationType: string,
    operationResultType: string,
    operationVariablesTypes: string
  ): string {
    const component = this.config.withComponent
      ? this._buildComponent(node, documentVariableName, operationType, operationResultType, operationVariablesTypes)
      : null;
    const hooks = this.config.withHooks
      ? this._buildHooks(node, operationType, documentVariableName, operationResultType, operationVariablesTypes)
      : null;

    return [component, hooks].filter(a => a).join('\n');
  }
}
