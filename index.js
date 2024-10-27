const { createInterpreter } = require('@ucast/core');

const interpreter = createInterpreter({
  // Logical Operators
  and(node, context) {
    const conditions = node.value.map(condition => interpreter(condition, context));
    return { $and: conditions };
  },
  or(node, context) {
    const conditions = node.value.map(condition => interpreter(condition, context));
    return { $or: conditions };
  },
  not(node, context) {
    const condition = interpreter(node.value, context);
    return { $not: condition };
  },
  nor(node, context) {
    const conditions = node.value.map(condition => interpreter(condition, context));
    return { $nor: conditions };
  },

  // Comparison Operators
  eq(node, context) {
    const { field, value } = node;
    return { [field]: { $eq: value } };
  },
  ne(node, context) {
    const { field, value } = node;
    return { [field]: { $ne: value } };
  },
  gt(node, context) {
    const { field, value } = node;
    return { [field]: { $gt: value } };
  },
  gte(node, context) {
    const { field, value } = node;
    return { [field]: { $gte: value } };
  },
  lt(node, context) {
    const { field, value } = node;
    return { [field]: { $lt: value } };
  },
  lte(node, context) {
    const { field, value } = node;
    return { [field]: { $lte: value } };
  },
  in(node, context) {
    const { field, value } = node;
    return { [field]: { $in: value } };
  },
  nin(node, context) {
    const { field, value } = node;
    return { [field]: { $nin: value } };
  },

  // Element Operators
  exists(node, context) {
    const { field, value } = node;
    return { [field]: { $exists: value } };
  },
  type(node, context) {
    const { field, value } = node;
    return { [field]: { $type: value } };
  },

  // Evaluation Operators
  regex(node, context) {
    const { field, value } = node;
    const pattern = value.pattern || '';
    const options = value.options || '';
    const regex = new RegExp(pattern, options);
    return { [field]: regex };
  },
  expr(node, context) {
    // $expr allows the use of aggregation expressions within the query language
    const expr = interpreter(node.value, context);
    return { $expr: expr };
  },
  jsonSchema(node, context) {
    // $jsonSchema validates documents against the given JSON Schema
    return { $jsonSchema: node.value };
  },
  text(node, context) {
    // $text performs text search
    return { $text: node.value };
  },
  where(node, context) {
    // $where matches documents that satisfy a JavaScript expression
    return { $where: node.value };
  },

  // Array Operators
  all(node, context) {
    const { field, value } = node;
    return { [field]: { $all: value } };
  },
  elemMatch(node, context) {
    const { field, value } = node;
    const condition = interpreter(value, context);
    return { [field]: { $elemMatch: condition } };
  },
  size(node, context) {
    const { field, value } = node;
    return { [field]: { $size: value } };
  },

  // Bitwise Operators
  bitsAllClear(node, context) {
    const { field, value } = node;
    return { [field]: { $bitsAllClear: value } };
  },
  bitsAllSet(node, context) {
    const { field, value } = node;
    return { [field]: { $bitsAllSet: value } };
  },
  bitsAnyClear(node, context) {
    const { field, value } = node;
    return { [field]: { $bitsAnyClear: value } };
  },
  bitsAnySet(node, context) {
    const { field, value } = node;
    return { [field]: { $bitsAnySet: value } };
  },

  // Modulo Operator
  mod(node, context) {
    const { field, value } = node; // value should be an array [divisor, remainder]
    return { [field]: { $mod: value } };
  },

  // Geospatial Operators
  geoWithin(node, context) {
    const { field, value } = node;
    return { [field]: { $geoWithin: value } };
  },
  geoIntersects(node, context) {
    const { field, value } = node;
    return { [field]: { $geoIntersects: value } };
  },
  near(node, context) {
    const { field, value } = node;
    return { [field]: { $near: value } };
  },
  nearSphere(node, context) {
    const { field, value } = node;
    return { [field]: { $nearSphere: value } };
  },

  // Text Search Operators
  search(node, context) {
    // Used within $text operator
    return { $search: node.value };
  },
  language(node, context) {
    // Used within $text operator
    return { $language: node.value };
  },
  caseSensitive(node, context) {
    // Used within $text operator
    return { $caseSensitive: node.value };
  },
  diacriticSensitive(node, context) {
    // Used within $text operator
    return { $diacriticSensitive: node.value };
  },

  // Custom Operators
  // Add any custom operators your application requires

  // Default handler for unsupported operators
  default(node, context) {
    throw new Error(`Unsupported operator: ${node.operator}`);
  },
});


module.exports = interpreter;