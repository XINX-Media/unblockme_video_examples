var studentAge = 16;

var carRentalAge = 25;
var seniorDiscountAge = 65;
var highschoolDiscountAge = 18;

// relational operators

var canRentCar = studentAge >= carRentalAge;
var getsSeniorDiscount = studentAge >= seniorDiscountAge;
var getsHighschoolDiscount = studentAge <= highschoolDiscountAge;

var getsAnyDiscount = studentAge >= seniorDiscountAge || studentAge <= highschoolDiscountAge || studentAge == 40;

// >
// <
// >=
// <=

console.log(canRentCar, getsSeniorDiscount, getsHighschoolDiscount);

// equality operators

var studentName = "Alice";

// ==
var isStudentBob = studentName != "Bob";

var studentAge = "25";

// !==
var isStudentTwentyFive = studentAge === 25;

console.log("student is twenty five? " + isStudentTwentyFive);

// logical operators

var isStudentEnrolled = false;
var hasStudentPaid = true;

var isInGoodStanding = isStudentEnrolled && hasStudentPaid;
console.log(isInGoodStanding);

var hasStudentSubmittedHomework = false;
var hasStudentAttendedClass = false;

var isStudentActive = hasStudentSubmittedHomework || hasStudentAttendedClass;
console.log(isStudentActive);

// compound comparisons

