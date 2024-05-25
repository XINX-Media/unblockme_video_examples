import students, { Student } from "./db";

const studentsById: { [index: number]: Student } = students.reduce((obj, student) => {
    return {
        ...obj,
        [student.id]: student,
    };
}, {});

const studentOne = studentsById[1];

if (studentOne.grade && studentOne.grade >= 72) {
    console.log(`Student ${studentOne.name} is passing!`);
}