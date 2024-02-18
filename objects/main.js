var myObj = {
    name: "Robbert",
    age: 34,
    role: "Instructor",
    "my-address": "Somwhere, CA",
};

console.log(myObj);

console.log(myObj["name"]);
console.log(myObj.name);

var key = "my-address";

console.log(myObj[key]);

myObj["shoes"] = true;
myObj.jacket = true;
myObj[key] = "new address, CA";

console.log(myObj);

var keys = Object.keys(myObj);

console.log(keys);

var values = Object.values(myObj);

console.log(values);

for (var i=0;i<keys.length;i++) {
    var key = keys[i];
    var value = myObj[key];

    console.log(key, value);
}

var students = [
    { name: 'Robbert' },
    { name: 'John' },
    { name: 'Lisa' },
];

var studentsByName = {};

for (var i=0;i<students.length;i++) {
    var student = students[i];

    studentsByName[student.name] = student;
}

console.log(studentsByName);