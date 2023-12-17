const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(myField){
    this.myField = myField;
    this.row = 0;
    this.col = 0;
    this.gameOver = false;
  }

  print(){
    for (let row of this.myField){
      console.log(row.join(''));
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
      console.log('Where would you like to move? { u(up) ,d(down) ,l(left) ,r(right)}');
    }
  }

  .generateField(height, width, holePercentage){
    const field = [];

    for (let i = 0; i < height; j++){
      const row = [];
      for(let j= 0; j < width; j++){
        row.push(Math.random() < holePercentage ? '0' : ' ');
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
}

const firstField = new Field ([
    ['*', 'O', 'O' ,'O'],
    ['O', 'H', 'O', 'O'],
    ['*', 'O', 'O', 'O']
]);



myFirstField.printField();