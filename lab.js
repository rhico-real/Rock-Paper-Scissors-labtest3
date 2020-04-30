function beGone(){
  document.getElementById('button').remove();
}

function rpsGame(pamato){
  let player, computerBot,results,message_results;

  player=pamato.id;
  computerBot=computerBotChoice(randomNumber());

  results=decideWinner(player,computerBot);
  console.log(results);

  message_results=finalMessage(results);
  console.log(message_results);

  message_results_for_computerBot=finalMessagecomputerBot(results);

  rpsFrontEnd(player,computerBot,message_results,message_results_for_computerBot);
}

function randomNumber(){
  let number=Math.random()*3;
  return Math.floor(number);
}

function computerBotChoice(number){
  let list=['rock','paper','scissors'][number];
  return list;
}

function decideWinner(playersid,computerBotsid){
  var rpsDatabase={
    'rock':{'scissors':1, 'rock':0.5, 'paper':0},
    'paper':{'rock':1, 'paper': 0.5, 'scissors':0},
    'scissors':{'paper':1, 'scissors':0.5, 'rock':0}
  }

  var playerScore=rpsDatabase[playersid][computerBotsid];
  var computerBotScore=rpsDatabase[computerBotsid][playersid];

  return [playerScore,computerBotScore];
}

function finalMessage([playerScore,computerBotScore]){
  if(playerScore===0){
    return {'message':'You Lost','color':'#8B2323'};
  }

  else if(playerScore===0.5){
    return {'message':'It\'s a tie','color':'#FFD300'}
  }

  else{
    return {'message':'You Win','color':'darkgreen'}
  }
}

function finalMessagecomputerBot([playerScore,computerBotScore]){
  if(computerBotScore===0){
    return {'message':'You Lost','color':'#8B2323'};
  }

  else if(computerBotScore===0.5){
    return {'message':'It\'s a tie','color':'#FFD300'}
  }

  else{
    return {'message':'You Win','color':'darkgreen'}
  }
}

function countdown(secs,elem){
  let list=['Finally, ComputerBot\'s choice is...', 'ComputerBot\'s having a hard time', 'ComputerBot\'s choosing'];

  let element=document.createElement("H1");
  element.innerHTML=list[secs-1];
  element.setAttribute("id","timer")
  document.getElementById(elem).appendChild(element);

  secs--;

  if(secs<0){
    clearTimeout(timer);
    document.getElementById("timer").remove();
    return;
  }

  var timer=setTimeout('countdown('+secs+',"'+elem+'")',1000);
  setTimeout(function(){document.getElementById("timer").remove()},995);
}

function rpsFrontEnd(playerResult,computerBotResult,MessageResult,MessageResultComputerBot){
  let imageDatabase={
    'rock':document.getElementById('rock').src,
    'paper':document.getElementById('paper').src,
    'scissors':document.getElementById('scissors').src
  }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    document.getElementById('choose').remove();

  countdown(3,"flex-box-gameField");

  setTimeout(function(){
    let playerDiv=document.createElement('div');
    let messageDiv=document.createElement('div');
    let computerBotDiv=document.createElement('div');
    let reloadbtnDiv=document.createElement('div');

    playerDiv.innerHTML="<img src='"+imageDatabase[playerResult]+"'data-toggle='tooltip' data-placement='top' title='The player' style='box-shadow: 5px 10px 5px 0px "+MessageResult['color']+";'>"
    messageDiv.innerHTML="<h1 style='color:"+MessageResult['color']+"; font-size:60px; padding: 30px;'>"+MessageResult['message']+"</h1>"
    computerBotDiv.innerHTML="<img src='"+imageDatabase[computerBotResult]+"'data-toggle='tooltip' data-placement='top' title='The computer bot\'s choice' style='box-shadow: 5px 10px 5px 0px "+MessageResultComputerBot['color']+";'>"

    reloadbtnDiv.innerHTML="<button class='btn btn-success' onclick='location.reload()' style='margin-top: 3rem;'>Play Again?</button>"

    document.getElementById('flex-box-gameField').appendChild(reloadbtnDiv);
    document.getElementById('flex-box-gameField').appendChild(playerDiv);
    document.getElementById('flex-box-gameField').appendChild(messageDiv);
    document.getElementById('flex-box-gameField').appendChild(computerBotDiv);
  },3000);
}
