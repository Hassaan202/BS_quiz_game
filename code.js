let fruitChoices=document.querySelectorAll("#options div label");
let scoreBoard=document.querySelector("#correctAnswers");
let fruitImage=document.querySelector("#fruitImg");
let submitBtn=document.querySelector("#checkAns");
let fruitForm=document.querySelectorAll("#options div input");
let modalWindow=document.querySelector("#modalContent");

let fruitArr=["apple", "banana", "blueberry", "cherry", "grapes", "guava", "mango", "papaya", "peach", "rasberry"];
let score=0;
const numFruits=10;
let correctChoice=-1;

const generateRandomNum=(num)=>{
    //generate random number between 0 and 9 inclusive
    return Math.floor(Math.random()*num);
}

const displayRandomFruitAndChoices=()=>{
    let currFruitNum=generateRandomNum(numFruits);
    let currFruitName=fruitArr[currFruitNum];
    //image set
    fruitImage.setAttribute("src", `img/fruits/${currFruitName}.jpeg`); 
    //now need to set up the choices
    correctChoice=generateRandomNum(4);
    let selectedArr=[0,0,0,0,0,0,0,0,0,0];
    selectedArr[currFruitNum]=1;
    let index=0;
    for (let option of fruitChoices){
        if (index!=correctChoice){
            let tmpFruitNum=generateRandomNum(numFruits);
            let tmpFruitName=fruitArr[tmpFruitNum];
            //produce a unique fruit name
            while (selectedArr[tmpFruitNum]!=0){
                tmpFruitNum=generateRandomNum(numFruits);
                tmpFruitName=fruitArr[tmpFruitNum];
            }
            selectedArr[tmpFruitNum]=1;
            option.innerText=tmpFruitName;
        }
        else{
            option.innerText=currFruitName;
        }
        index++;
    }
}

let userChoice=-1;

const checkAnswer=(evt)=>{
    evt.preventDefault();
    evt.stopPropagation();
    for (let input of fruitForm){
        if (input.checked){
            userChoice=input.getAttribute("value") - 1;
        }
    }
    if (userChoice==-1){
        //if no option selected
        modalWindow.innerText="You must select a option";
        modalWindow.parentElement.classList.add("bg-warning");
        modalWindow.parentElement.classList.replace("bg-success", "bg-warning");
        modalWindow.parentElement.classList.replace("bg-danger", "bg-warning");
    }
    else{
        if (userChoice==correctChoice){
            scoreBoard.innerText=++score;
            //display that the answer was correct
            modalWindow.innerText="Correct Answer!";
            modalWindow.parentElement.classList.add("bg-success");
            modalWindow.parentElement.classList.replace("bg-warning", "bg-success");
            modalWindow.parentElement.classList.replace("bg-danger", "bg-success");
        }
        else{
            //display that the answer was incorrect
            modalWindow.innerText="Answer is not correct!";
            modalWindow.parentElement.classList.add("bg-danger");
            modalWindow.parentElement.classList.replace("bg-success", "bg-danger");
            modalWindow.parentElement.classList.replace("bg-warning", "bg-danger");

        }
        for (let input of fruitForm){
            input.checked=false;
        }
        displayRandomFruitAndChoices();
        userChoice=-1;
    }
}   

window.addEventListener("load", displayRandomFruitAndChoices);
submitBtn.addEventListener("click", checkAnswer);

