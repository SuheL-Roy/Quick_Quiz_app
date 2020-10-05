
const question=document.getElementById('question');
const choices=Array.from(document.getElementsByClassName('Choice-text'));
const ProgressText=document.getElementById('progressText');
const scoreText=document.getElementById('score');
const progressBarFull=document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game=document.getElementById('game');
let currentQuestion={};
let acceptinganswere = false;
let score = 0;

let questionCounter = 0;

let avilableQuestions = [];

let questions =[];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res =>{
  
  //console.log(res);

  return res.json();
})
.then(loadedQuestions =>{
 console.log(loadedQuestions.results);
  questions=loadedQuestions.results.map(loadedQuestions =>{
   const formatQuestion = {
     question:loadedQuestions.question
   };
   const ansewrechoices = [...loadedQuestions.incorrect_answers];
   formatQuestion.answer=Math.floor(Math.random() * 3) + 1;
   ansewrechoices.splice(formatQuestion.answer -1,0,loadedQuestions.correct_answer);
   ansewrechoices.forEach((choice,index)=>{
     formatQuestion["choice" + (index+1)] = choice;
   })

   return formatQuestion;
 });
 //questions=loadedQuestions;
 //game.classList.remove("hidden");
 //loader.classList.add("hidden");
 stargame();
})
.catch(err =>{
   console.error(err);

});

const correct_bonus=10;
const max_questtions=9;
stargame = () =>{
    questionCounter=0;
    score=0;
    avilableQuestions=[...questions];
    //console.log(avilableQuestions);
    getNewQusetion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
}
getNewQusetion=()=>{
    if(avilableQuestions.length === 0|| questionCounter >= max_questtions){
      localStorage.setItem('mostRecentScore',score);
        return window.location.assign('./end.html');
    }
    questionCounter++;
    ProgressText.innerText=`Question ${questionCounter}/${max_questtions}`;
    console.log((questionCounter/max_questtions) *100);
    progressBarFull.style.width =`${(questionCounter / max_questtions)*100}% `; 
    const questionIndex=Math.floor(Math.random() * avilableQuestions.length);
    currentQuestion=avilableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
      });
      avilableQuestions.splice(questionIndex,1);
      //console.log(avilableQuestions);
      acceptinganswere = true;
    
};
choices.forEach(choice =>{
    choice.addEventListener('click', e=>{
       // console.log(e.target);
       if(!acceptinganswere) return;
       acceptinganswere= false;
       const selectedChoice=e.target;
       const selectAnswere=selectedChoice.dataset["number"];
       //console.log(selectAnswere == currentQuestion.answer);
       const classToapply = 
       selectAnswere == currentQuestion.answer ? 'correct':'incorrect';
       //console.log(classToapply);
       if(classToapply === 'correct' ){
         incrementScore(correct_bonus);
       }
       selectedChoice.parentElement.classList.add(classToapply);

       setTimeout(()=>{
        selectedChoice.parentElement.classList.remove(classToapply);
        getNewQusetion();

       },1000);
       

    });

});

incrementScore=num=>{
  score+=num;
  scoreText.innerText=score;
}


