import Tree from './Tree.mjs'

const tree = new Tree(0, 0, 0, 6, 6);

//tree.print();

tree.set(5,0,1);

console.log(tree.get(5, 0));

//tree.print();

tree.set(3,2,1);

console.log(tree.get(3, 2));