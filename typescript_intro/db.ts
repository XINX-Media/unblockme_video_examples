export type Student = {
    id: number,
    name: string,
    email: string,
    student: boolean,
    grade?: number,
}

const students: Student[] = [
    {
        "id": 1,
        "name": "Thomas",
        "email": "thom@gmail.com",
        "student": true,
    },
    {
        "id": 2,
        "name": "Sally",
        "email": "sallysays@hotmail.com",
        "student": true,
    },
    {
        "id": 3,
        "name": "Jason",
        "email": "jay@jayjay.com",
        "student": false,
    },
    {
        "id": 4,
        "name": "Jason",
        "email": "jay@jayjay.com",
        "student": true,
        "grade": 85,
    },
];

export default students;