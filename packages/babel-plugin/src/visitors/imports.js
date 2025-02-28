/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import * as t from '@babel/types';
import type { NodePath } from '@babel/traverse';
import StateManager from '../utils/state-manager';

// Read imports of react and remember the name of the local varsiables for later
export function readImportDeclarations(
  path: NodePath<t.ImportDeclaration>,
  state: StateManager,
): void {
  const { node } = path;
  if (node?.importKind === 'type' || node?.importKind === 'typeof') {
    return;
  }
  if (state.options.importSources.includes(node.source.value)) {
    state.importPaths.add(node.source.value);
    for (const specifier of node.specifiers) {
      if (specifier.type === 'ImportDefaultSpecifier') {
        state.stylexImport.add(specifier.local.name);
      }
      if (specifier.type === 'ImportNamespaceSpecifier') {
        state.stylexImport.add(specifier.local.name);
      }
      if (specifier.type === 'ImportSpecifier') {
        if (specifier.imported.type === 'Identifier') {
          if (specifier.imported.name === 'create') {
            state.stylexCreateImport.add(specifier.local.name);
          }
          if (specifier.imported.name === 'props') {
            state.stylexPropsImport.add(specifier.local.name);
          }
          if (specifier.imported.name === 'keyframes') {
            state.stylexKeyframesImport.add(specifier.local.name);
          }
          if (specifier.imported.name === 'include') {
            state.stylexIncludeImport.add(specifier.local.name);
          }
          if (specifier.imported.name === 'firstThatWorks') {
            state.stylexFirstThatWorksImport.add(specifier.local.name);
          }
          if (specifier.imported.name === 'defineVars') {
            state.stylexDefineVarsImport.add(specifier.local.name);
          }
          if (specifier.imported.name === 'createTheme') {
            state.stylexCreateThemeImport.add(specifier.local.name);
          }
          if (specifier.imported.name === 'types') {
            state.stylexTypesImport.add(specifier.local.name);
          }
        }
        if (specifier.imported.type === 'StringLiteral') {
          if (specifier.imported.value === 'create') {
            state.stylexCreateImport.add(specifier.local.name);
          }
          if (specifier.imported.value === 'props') {
            state.stylexPropsImport.add(specifier.local.name);
          }
          if (specifier.imported.value === 'keyframes') {
            state.stylexKeyframesImport.add(specifier.local.name);
          }
          if (specifier.imported.value === 'include') {
            state.stylexIncludeImport.add(specifier.local.name);
          }
          if (specifier.imported.value === 'firstThatWorks') {
            state.stylexFirstThatWorksImport.add(specifier.local.name);
          }
          if (specifier.imported.value === 'defineVars') {
            state.stylexDefineVarsImport.add(specifier.local.name);
          }
          if (specifier.imported.value === 'createTheme') {
            state.stylexCreateThemeImport.add(specifier.local.name);
          }
          if (specifier.imported.value === 'types  ') {
            state.stylexTypesImport.add(specifier.local.name);
          }
        }
      }
    }
  }
}

// Read require calls and remember the names of the variables for later
export function readRequires(
  path: NodePath<t.VariableDeclarator>,
  state: StateManager,
): void {
  const { node } = path;
  const init = node.init;
  if (
    init != null &&
    init.type === 'CallExpression' &&
    init.callee?.type === 'Identifier' &&
    init.callee?.name === 'require' &&
    init.arguments?.length === 1 &&
    init.arguments?.[0].type === 'StringLiteral' &&
    state.options.importSources.includes(init.arguments[0].value)
  ) {
    const importPath = init.arguments[0].value;
    importPath != null && state.importPaths.add(importPath);
    if (node.id.type === 'Identifier') {
      state.stylexImport.add(node.id.name);
    }
    if (node.id.type === 'ObjectPattern') {
      for (const prop of node.id.properties) {
        if (
          prop.type === 'ObjectProperty' &&
          prop.key.type === 'Identifier' &&
          prop.value.type === 'Identifier'
        ) {
          const value: t.Identifier = prop.value;
          if (prop.key.name === 'create') {
            state.stylexCreateImport.add(value.name);
          }
          if (prop.key.name === 'props') {
            state.stylexPropsImport.add(value.name);
          }
          if (prop.key.name === 'keyframes') {
            state.stylexKeyframesImport.add(value.name);
          }
          if (prop.key.name === 'include') {
            state.stylexIncludeImport.add(value.name);
          }
          if (prop.key.name === 'firstThatWorks') {
            state.stylexFirstThatWorksImport.add(value.name);
          }
          if (prop.key.name === 'defineVars') {
            state.stylexDefineVarsImport.add(value.name);
          }
          if (prop.key.name === 'createTheme') {
            state.stylexCreateThemeImport.add(value.name);
          }
          if (prop.key.name === 'types') {
            state.stylexTypesImport.add(value.name);
          }
        }
      }
    }
  }
}
