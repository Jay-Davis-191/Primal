// Finds the appropriate age group for the logged in user. 
// @params number, the recorded age of the user taken from firebase firestore. 
// @return the age group the user belongs to. This impacts the fitness reps and what list of curriculums the user can access. 


function FindAgeGroup(number) {  
    const LITTLE_DRAGON_MAX_AGE = 5; 
    const PANTHER_MAX_AGE = 8; 
    const COBRA_MAX_AGE = 12; 
    const JUNIOR_ADULT_MAX_AGE = 15; 

    const currentDate = retrieveCurrentDate();  
    const DOB = convertDOBToString(number); 
    const timeDifference = calculateTimeDifference(currentDate, DOB); 
    console.log(currentDate); // prints the current date in the format DD/MM/YYYY
    console.log(DOB);
    console.log(timeDifference);
    
    if (timeDifference <= LITTLE_DRAGON_MAX_AGE) {
        return 'Little Dragons'
    }
    else if (timeDifference <= PANTHER_MAX_AGE) {
        return 'Panthers'
    }
    else if (timeDifference <= COBRA_MAX_AGE) {
        return 'Cobras'
    }
    else if (timeDifference <= JUNIOR_ADULT_MAX_AGE) {
        return 'Junior Adults'
    }
    else {
        return 'Adults'
    }
  }; 
  
function retrieveCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

const convertDOBToString = (date) => {
    dateAsString = String(date);
    return dateAsString; 
}

function calculateTimeDifference(date1, date2) {
    const [day1, month1, year1] = date1.split("/");
    const [day2, month2, year2] = date2.split("/");
    
    const dateObject1 = new Date(`${year1}-${month1}-${day1}`);
    const dateObject2 = new Date(`${year2}-${month2}-${day2}`);
    
    const differenceInMilliseconds = Math.abs(dateObject1 - dateObject2);
    const differenceInYears = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);
    
    return Math.floor(differenceInYears).toString();
  }
    

export { FindAgeGroup }; 