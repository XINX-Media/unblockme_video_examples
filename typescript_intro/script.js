"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var studentsById = db_1.default.reduce(function (obj, student) {
    var _a;
    return __assign(__assign({}, obj), (_a = {}, _a[student.id] = student, _a));
}, {});
console.log(studentsById);
var studentOne = studentsById[1];
if (studentOne.grade && studentOne.grade >= 72) {
    console.log("Student ".concat(studentOne.name, " is passing!"));
}
