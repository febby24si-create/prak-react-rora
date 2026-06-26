const fs = require("fs");
const path = require("path");

function fixFile(relPath, oldNewPairs) {
  let content = fs.readFileSync(path.join(__dirname, relPath), "utf8");
  for (const [oldStr, newStr] of oldNewPairs) {
    content = content.split(oldStr).join(newStr);
  }
  fs.writeFileSync(path.join(__dirname, relPath), content, "utf8");
  console.log("Fixed:", relPath);
}

// Products.jsx: rename old schema fields to new PRD schema
fixFile("src/pages/Products.jsx", [
  ["title:", "name:"],
  [".title", ".name"],
  ["form.title", "form.name"],
  ["code:", "description:"],
  [".code", ".name"],
  ["\"code\"", "\"name\""],
  ["Product Code", "Description"],
  ["form.code", "form.description"],
  [".brand", ".description"],
  ["brand:", "description:"],
  ["form.brand", "form.description"],
  ["!form.name||!form.description||!form.description||!form.price||!form.stock", "!form.name||!form.price||!form.stock"],
]);

// ProductDetail.jsx: rename old schema fields
fixFile("src/pages/ProductDetail.jsx", [
  [".title", ".name"],
  ["product.title", "product.name"],
  [".code", ".name"],
  ["product.code", "product.name"],
  [".brand", ".description"],
  ["product.brand", "product.description"],
]);

console.log("Schema fix complete!");
