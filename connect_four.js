console.log("What")

var nameOne = prompt("Player 1 : Enter your name, you will be Blue");
var colorOne = 'rgb(86, 151, 255)';

var nameTwo = prompt("Player 2 : Enter your name, you will be Red");
var colorTwo = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum, colNum){
  console.log("You won starting at this row/col");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function reportColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
  var colorReport = reportColor(5, colIndex);
  for(var row=5; row>=0; row--){
    colorReport = reportColor(row, colIndex);
    if(colorReport === 'rgb(128, 128, 128)'){
      return row;
    }
  }
}

function sameColor(one, two, three, four){
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

function horizontalWinCheck(){
  for(var row=0; row<6; row++){
    for(var col=0; col<4; col++){
      if(sameColor(reportColor(row, col), reportColor(row, col+1), reportColor(row, col+2), reportColor(row, col+3))){
        console.log("Horizontal Win");
        reportWin(row, col);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for(var col=0; col<7; col++){
    for(var row=0; row<3; row++){
      if(sameColor(reportColor(row, col), reportColor(row+1, col), reportColor(row+2, col), reportColor(row+3, col))){
        console.log("Vertical Win");
        reportWin(row, col);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

function diagnolWinCheck(){
  for(var col=0; col<5; col++){
    for(var row=0; row<7; row++){
      if(sameColor(reportColor(row, col), reportColor(row+1, col+1), reportColor(row+2, col+2), reportColor(row+3, col+3))){
        console.log("Diagnol Win");
        reportWin(row, col);
        return true;
      }
      else if(sameColor(reportColor(row, col), reportColor(row-1, col+1), reportColor(row-2, col+2), reportColor(row-3, col+3))){
        console.log("Diagnol Win");
        reportWin(row, col);
        return true;
      }
      else{
        continue;
      }
    }
  }
}

var currentPlayer = 1;
var currentName = nameOne;
var currentColor = colorOne;

$('h3').text(nameOne + " it is your turn, please pick a column to drop your chip");

$('.board button').on('click', function(){
  var col = $(this).closest('td').index();
  var rowAvail = checkBottom(col);
  changeColor(rowAvail, col, currentColor);

  if(horizontalWinCheck() || verticalWinCheck() || diagnolWinCheck()){
    $('h1').text(currentName + " : Wins!!!");
    $('h3').fadeOut(1500);
    $('h2').fadeOut(1500);
  }

  currentPlayer = currentPlayer * -1;

  if(currentPlayer === 1){
    currentName = nameOne;
    currentColor = colorOne;
    $('h3').text(currentName + " it is your turn");
  }
  else{
    currentName = nameTwo;
    currentColor = colorTwo;
    $('h3').text(currentName + " it is your turn");
  }
})
