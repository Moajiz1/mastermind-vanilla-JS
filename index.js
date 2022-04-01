$('.rules-details').hide();
$('.btn-tick').hide();

const myFunction = () => {
    const x= document.getElementById("rules");
    if(x.style.display=="none"){
        x.style.display="block";
    }
    else{
        x.style.display="none";
    }
}

const changeHeading = () =>{
    const a=document.getElementById("heading");
    if(a.innerHTML==="Hide Rules"){
        a.innerHTML="Show Rules";
    }
    else{
        a.innerHTML="Hide Rules";
    }
}

(function(){
    $(".clr").click(function () {
        clr_bgd = $(this).css("background-color");
        // $(this).addClass('se').parent().siblings().children().removeClass('se');
        console.log(clr_bgd);
    });
    
    $(".guess-Peg").click(function(){
        if($(this).hasClass('active')){
            $(this).css("background-color", clr_bgd);
            click_count++;
            let coord=$(this).attr('id'); /*update master array on clicked guessPeg's id*/
            updateMasterArray(clr_bgd, coord); /*call*/
            if(click_count===4){
                $('.active-Tick').show();
                click_count=0;
            }
        }
    });

    $('.btn-tick').click(function(){
        $('.active').removeClass('active');
        $('.active-Tick').removeClass('active-Tick');
        let gradeRay=getGrade();
        checkWin(gradeRay);
        let gradeBox = getGradeBox();
        // tickPlace();
        placePegs(gradeRay,gradeBox);
        guess_count++;
        let gradeRayy = gradeRay.join();
        if(guess_count===10 && gradeRayy !== 'black-Pegs,black-Pegs,black-Pegs,black-Pegs,cross-Pegs,cross-Pegs,cross-Pegs,cross-Pegs'){
            $('.Lost').fadeIn(200);
        }
        
        for(let i=0; i<4; i++){
                $(`#g-${guess_count}-${i}`).addClass('active');
        }
        for(let i=0; i<=1; i++){
                $(`#t-${guess_count}`).addClass('active-Tick');
        }
        $('.btn-tick').hide();
    });
    

/*START--Pushing All Divs of Guess to an Array*/
const tempRay=$('.guess-Pegs'); /**/
const guessBoxArray =[]; /**/
// for(let x of tempRay){
for(let i=0; i<10; i++){
    guessBoxArray.push(tempRay[i]);
}
// console.log(guessBoxArray);
for(let i=0; i<10; i++){
    let guessArray= guessBoxArray[i].getElementsByClassName("guess-Peg");
    for(let j=0; j<4; j++){
        $(guessArray[j]).attr('id',`g-${i}-${j}`)
    }
    }
/*END--Pushing All Divs of Guess to an Array*/

/*About Tick*/
const tempTick=$('.btn-tick');
const tick =[];
for(let i=0; i<10; i++){
    tick.push(tempTick[i]);
}
for(let i=0; i<10; i++){
    let gTick= tick;
        $(gTick[i]).attr('id',`t-${i}`)
    }
    //want to ask about insert thing dynamically.

$('.btn-Play-Again').click(function(){
    location.reload();
});

function makeAnswer(){
    let ray=[];
    for(let i=0; i<4; i++){
    // let x=Math.floor(Math.random()*6);
    ray.push(Math.floor(Math.random()*6))
    }
    return ray;
}

const updateMasterArray = (clr, xy)=>{
    let cordRay = xy.split('-'); /*g-0-0*/
    let x=cordRay[1];
    let y=cordRay[2];
    masterGuessArray[x][y] = makeColorNumber(clr);
}

const makeColorNumber = (col)=>{
    if(col === 'rgb(255, 180, 0)') return 0;
    if(col === 'rgb(255, 90, 95)') return 1;
    if(col === 'rgb(140, 224, 113)') return 2;
    if(col === 'rgb(0, 209, 193)') return 3;
    if(col === 'rgb(0, 122, 135)') return 4;
    if(col === 'rgb(123, 0, 81)') return 5;
}

function getGrade(){
    let gradArray=[];
    let aRRay=[];
    for(let i=0; i<4; i++){
        aRRay.push(answerArray[i]);
    }
    /*black pegs*/
    for(let i=0; i<4; i++){
        if(masterGuessArray[guess_count][i]===aRRay[i]){
            gradArray.push('black-Pegs');
            aRRay[i]=-1;
            masterGuessArray[guess_count][i]=-2;
        }
    }

    /*white pegs*/
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
          if(masterGuessArray[guess_count][i] === aRRay[j]) {
            gradArray.push('white-Pegs');
            aRRay[j] = -1;
            masterGuessArray[guess_count][i] = -2;
          }
        }
      }

      /*Cross pegs*/
      for(let i=0; i<4; i++){
        if(masterGuessArray[guess_count][i]!=aRRay[i]){
            gradArray.push('cross-Pegs');
        }
    }
    return gradArray;
}

let nextGrader= $($('.first-Grade')[0]).parent()[0];/*Row of color pegs*/
const getGradeBox = ()=>{
    let activeGrade= nextGrader.getElementsByClassName('grade-Pegs')[0]; /*grading pegs*/
    nextGrader=$(nextGrader).next()[0]; /*Updated Row of color pegs*/
    return activeGrade;
}

// const tickPlace = () =>{
//     let ticknext=$($('.btn-tick')[0]).parent().prev().parent()[0];
//     console.log(ticknext);
//     let activeTick = ticknext.getElementsByClassName('tickk')[0];
//     console.log(activeTick);
//     // ticknext=$(ticknext).next()[0];
//     return activeTick;
// }

const placePegs = (ray, box)=>{
    let pegRay= box.getElementsByClassName("grade-Peg");
    for(i=0; i<ray.length; i++){
        $(pegRay[i]).addClass(`${ray[i]}`);
    }
    $('.white-Pegs').css('background-color','white');
    $('.black-Pegs').css('background-color','black');
    $('.cross-Pegs').html('<i class="fa fa-times"></i>');
}

const checkWin = (ray)=>{
    let rayStr = ray.join();
    if(rayStr === 'black-Pegs,black-Pegs,black-Pegs,black-Pegs,cross-Pegs,cross-Pegs,cross-Pegs,cross-Pegs'){
        $('.Win').fadeIn(200);
    }
}

// Expose to global
// window['varName'] = varName;
let clr_bgd="";
let click_count=0;
let guess_count=0;

/*answer array generating*/
const answerArray=makeAnswer();
console.log(answerArray);

const masterGuessArray=
    [[-1,-1,-1,-1],
    [-1,-1,-1,-1],
    [-1,-1,-1,-1],
    [-1,-1,-1,-1],
    [-1,-1,-1,-1],
    [-1,-1,-1,-1],
    [-1,-1,-1,-1],
    [-1,-1,-1,-1],
    [-1,-1,-1,-1],
    [-1,-1,-1,-1]];
})();