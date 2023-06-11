var names = [
    "Bob",
    "Tom",
    "Jenny",
    "Betty",
    "Billy"
];

for (var i=0;i<names.length;i++) {
    var name = names[i];
    console.log(name);
}

console.log("");

var newName = "Rob";
names.push(newName);
names.unshift("Rose");

for (var i=0;i<names.length;i++) {
    var name = names[i];
    console.log(name);
}

var removedName = names.pop();

console.log(removedName);
console.log(names);

removedName = names.shift();
console.log(removedName);
console.log(names);

removedName = names.splice(2, 1);
console.log(removedName);
console.log(names);

names.splice(3, 0, "Thomas");
console.log(names);