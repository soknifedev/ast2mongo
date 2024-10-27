const { CompoundCondition, FieldCondition } = require('@ucast/core');
const ast2mongo = require('./index');

const condition = new CompoundCondition('and', [
    new FieldCondition('gt', 'x', 5),
    new FieldCondition('lt', 'y', 10),
]);

const mongoQuery = ast2mongo(condition)

console.log('mongoQuery', JSON.stringify(mongoQuery, null, 2));