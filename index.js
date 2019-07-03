const fs = require('fs');
const babylon = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');

const code = fs.readFileSync(`${__dirname}/code.js`);

const FunctionExpression = path => {
  if (!path.node.body.directives) {
    return;
  }

  path.node.body.directives = path.node.body.directives.reduce((directives, directive) => {
    if (!t.isDirectiveLiteral(directive.value) || directive.value.value !== 'ngInject') {
      directives.push(directive);
      return;
    }

    path.replaceWith(
      t.arrayExpression([
        ...path.node.params.map(param => t.stringLiteral(param.name)),
        path.node
      ])
    );
  }, []);
}

const ast = babylon.parse(code.toString());
traverse(ast, {
  FunctionExpression,
  ArrowFunctionExpression: FunctionExpression
});

const gen = generator(ast, {}, code);
console.log(gen.code);
