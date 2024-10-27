#ast2mongo
Transforms ucast's AST conditions into a valid mongodb query.

# Motivation
Building a query builder turned into a complex task forcing my team to relay on the 'react-query-builder' library.
Things happen, I ended up coding a query builder outside the react ecosystem and it turned into a nightmare, until
I remembered stalniy's CASL library, and cuz I always look deeply... I knew the existance of the 'ucast/core' developed by the same human. This powerful library help us to simplify our query builder component.

# Usage example
```JavaScript
const condition = new CompoundCondition('and', [
  new FieldCondition('gt', 'x', 5),
  new FieldCondition('lt', 'y', 10),
]);

const ast2mongo = require('index');

const mongoQuery = ast2mongo(condition)
```
