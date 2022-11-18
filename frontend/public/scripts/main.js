const currentDate = new Date();
let date = currentDate;
let month = date.getMonth();
let today = date.getDay();
let currentYear = date.getFullYear();
let todayDate = date.getDate();
let dateOutput = document.querySelector('.today')



// Functions

// Function to spit out full date. 
function getFullDate() {
    switch(month) {
        case 0:
        month = 'January';
        break;

        case 1:
            month = 'February';
        break;

        case 2:
            month = 'March';
        break;

        case 3:
            month = 'April';
        break;

        case 4:
            month = 'May';
        break;

        case 5:
            month = 'June';
        break;

        case 6:
            month = 'July';
        break;

        case 7:
            month = 'August';
        break;

        case 8:
            month = 'September';
        break;

        case 9:
            month = 'October';
        break;

        case 10:
            month = 'November';
        break;

        case 11:
        month = 'December';
        break;
    }

    switch(today) {
        case 0:
            today = 'Sunday';
        break;

        case 1:
            today = 'Monday';
        break;

        case 2:
            today = 'Tuesday';
        break;

        case 3:
            today = 'Wednesday';
        break;

        case 4:
            today = 'Thursday';
        break;

        case 5:
            today = 'Friday';
        break;

        case 6:
            today = 'Saturday';
        break;
    }

    dateOutput.innerText = `${month},  ${todayDate} ${currentYear}`;
}

getFullDate();