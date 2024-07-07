let points = JSON.parse(localStorage.getItem('Points')) || {
    wins: 0,
    loss: 0,
    tie: 0
  };
scoreDisplay();
let playerMoveResult;
let sysMove = '';
let result = '';

function playerMove(decision){
  playerMoveResult = decision;
  systemMove();
  compareTo(playerMoveResult , sysMove);
  Result();
}

document.body.addEventListener('keydown' , (event) => {
  if(event.key === 'r'){
    playerMove('Rock');
    reuse();
  }
  else if(event.key === 'p'){
    playerMove('Paper');
    reuse();
  }
  else if(event.key === 's'){
    playerMove('Scissor');
    reuse();
  }
})

function autoPlay(){
  let auto = false;
  let interval;
  if(!auto){
    auto = true;
    interval = setInterval(function() {
      playerMoveResult = systemMove();
      systemMove();
      compareTo(playerMoveResult , sysMove);
    Result();
    },1000);
  }
  else{
    auto = false;
    clearInterval(interval);
  }

}

function systemMove(){
  let move = Math.random();
  if(move > 0 && move < 0.3){
    sysMove = 'Rock';
  }
  else if(move >=0.3 && move < 0.7){
    sysMove = 'Paper';
  }
  else{
    sysMove = 'Scissor';
  }
}

function compareTo(playerMoveResult , sysMove){
  if(playerMoveResult == sysMove){
    result = 'It is tie';
    console.log('It is tie');
  }
  else if((playerMoveResult == 'Rock' && sysMove == 'Paper') || (playerMoveResult == 'Paper' && sysMove == 'Scissor') || (playerMoveResult == 'Scissor' && sysMove == 'Rock')){
    result = 'The player lose';
    console.log('The player lose');
  }
  else{
    result = 'The player wins';
    console.log('The player wins');
  }
  displayMove(playerMoveResult , sysMove);
}


function displayMove(playerMoveResult , sysMove){
  document.querySelector('.js-moves').innerHTML = (`Player move - ${playerMoveResult} System move - ${sysMove}`);
}



function Result(){
  if(result == 'It is tie'){
    points.tie += 1;
  }
  else if(result == 'The player wins'){
    points.wins += 1;
  }
  else{
    points.loss += 1;
  }
  scoreDisplay();
  displayResult(result);
  localStorage.setItem('Points' , JSON.stringify(points));
}


function scoreDisplay(){
  document.querySelector('.js-points').innerHTML = (`Wins - ${points.wins} Loss - ${points.loss} Tie - ${points.tie}`);
}


function displayResult(result){
  document.querySelector('.js-result').innerHTML = result;
}


function reset(){
  points.wins = 0;
  points.loss = 0;
  points.tie = 0;
  console.log('The scores are resetted');
  scoreDisplay();
  document.querySelector('.js-moves').innerHTML = '';
  document.querySelector('.js-result').innerHTML = '';
  localStorage.setItem('Points' , JSON.stringify(points));
}

function reuse(){
  systemMove();
  compareTo(playerMoveResult , sysMove);
  Result();
}