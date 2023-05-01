// Finds the necessary number of reps the user has to complete for the selected belt colour. 
// @params belt, the current belt the user has selected. 
// @params ageGroup, the age group the user belongs to. e.g. Little Dragons, Panthers, Cobras, etc.  
// @return the necessary number of reps the user has to complete.  

function FindFitnessReps(belt, ageGroup) {
    switch (ageGroup) {
        case "Adults":
            switch (belt) {
                case "White":
                    return '10';
                case "Orange":
                    return '20';
                case "Yellow":
                    return '30';
                case "Green":
                    return '40';
                case "Purple":
                    return '50';
                case "Blue":
                    return '60';
                case "Brown":
                    return '70';
                case "Red":
                    return '80';
                case "Grey":
                    return '100';
                default: 
                    return '150';
            }
        default:
            return 'N/A';
    }
  }; 
  
  
  export { FindFitnessReps }; 