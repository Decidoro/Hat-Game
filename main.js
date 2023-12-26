const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(height, width, holePercentage){
    this.myField = this.generateField(height, width, holePercentage);
    this.row = 0;
    this.col = 0;
    this.gameOver = false;
  }
  //this code tries to clear the console for a cleaner look (still working on it)
  clearConsole(){
    console.clear;
  }

  print(){
    for (let i = 0; i < this.myField.length; i++){
      console.log(this.myField[i].join(' '));
    }
  }
    //takes a 'direction' and moves according to selection
  movement(direction){
    switch(direction){
      case 'u':
        this.row -= 1;
        break;
      case 'd':
        this.row += 1;
        break;
      case 'l':
        this.col -= 1;
        break;
      case 'r':
        this.col += 1;
        break;
    }
    //this code constantly checks for the position of the player and checks if the player has won or lost
    if(this.row < 0 || this.row >= this.myField.length || this.col < 0 || this.col >= this.myField[0].length){
      console.log('Game Over! You moved outside the field.');
      this.gameOver = true;
    }else if(this.myField[this.row][this.col] === 'H'){
      console.log('Congratulations! You found the hat. You win!');
      this.gameOver = true;
    }else if(this.myField[this.row][this.col] === 'O'){
      console.log('Game Over! You fell into a hole.');
      this.gameOver = true;
    }else {
      this.myField[this.row][this.col] = '*';
      this.print();
      console.log('Where would you like to move? [u(up) ,d(down) ,l(left) ,r(right)] *Press enter after each move*');
    }
  }

  generateField(height, width, holePercentage){
    const field = [];

    for (let i = 0; i < height; i++){
      const row = [];
      for(let j= 0; j < width; j++){
        row.push(Math.random() < holePercentage ? 'O' : fieldCharacter);
      }
      field.push(row)
    }

    //Creates a random place in the field to place the 'H' (the hat)
    const hatRow = Math.floor(Math.random() * height);
    const hatCol = Math.floor(Math.random() * width);
    field[hatRow][hatCol] = 'H';

    //places 'player' at the start of the field to ensure it is not placed on a hole or hat
    field[0][0] = ' ';

    return field;
  }
    //This code gets the users feedback and responds according to input
    play() {
    while (!this.gameOver) {

      this.clearConsole();
      this.print();
      
      const direction = prompt('Where would you like to move? [u(up) ,d(down) ,l(left) ,r(right)] *Press enter after each move.* ');
      this.movement(direction.trim().toLowerCase());
    }
  }
}

//Here a field is created specifing how many holes to put in the field
const firstField = new Field(6,6, .25);


firstField.play();