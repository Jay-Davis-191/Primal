function FindFitnessReps(belt, ageGroup) {
    switch (ageGroup) {
        case "Adults":
            return '10'; 
        default:
            return '1000';
    }
  }; 
  
  
  export { FindFitnessReps }; 