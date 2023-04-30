// Finds the appropriate age group for the logged in user. 
// @params number, the recorded age of the user taken from firebase firestore. 
// @return 


function FindAgeGroup(number) {  
    const LITTLE_DRAGON_MAX_AGE = 5; 
    const PANTHER_MAX_AGE = 8; 
    const COBRA_MAX_AGE = 12; 
    const JUNIOR_ADULT_MAX_AGE = 15; 

    if (number <= LITTLE_DRAGON_MAX_AGE) {
        return 'Little Dragons'
    }
    else if (number <= PANTHER_MAX_AGE) {
        return 'Panthers'
    }
    else if (number <= COBRA_MAX_AGE) {
        return 'Cobras'
    }
    else if (number <= JUNIOR_ADULT_MAX_AGE) {
        return 'Junior Adults'
    }
    else {
        return 'Adults'
    }
  }; 
  
  
  export { FindAgeGroup }; 