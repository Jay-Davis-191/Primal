function FindBeltLevel(number) {
  const NUMBER_TO_PROVISIONAL_BLACK_BELT = 192 / 24; 
  var x = Math.floor(number / 24); // Divides the total number of classes by the required number of classes for each belt except for provisional-black and black.
  if (x < NUMBER_TO_PROVISIONAL_BLACK_BELT) { // Implies the student reaches the number of classes necessary for a black belt.
    switch (x) {
    case 0:
      return 'White';
    case 1: 
      return 'Orange';
    case 2: 
      return 'Yellow';
    case 3: 
      return 'Green';
    case 4:
      return 'Purple';
    case 5: 
      return 'Blue';
    case 6: 
      return 'Brown';
    case 7: 
      return 'Red';
    default:
      return 'White'; 
    }
  }
  else if (8 <= x && x < 10) {
    return 'Grey'; 
  }
  else if (x >= 10) {
    return 'Black'
  }
  else {
    return 'Break'
  }
}; 


export { FindBeltLevel }; 