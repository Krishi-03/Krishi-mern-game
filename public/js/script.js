const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
finishBtn = document.querySelector(".finish-game");
scoreArea = document.querySelector(".score");
let correctWord, timer;
let score = 0; 
let maxscore = sessionStorage.getItem("scramble-max-score") || 0;
const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(120);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    scoreArea.innerHTML = score;
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    else
    {
        alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
        score+=10;
        scoreArea.innerText = score;

        if (score > maxscore) {
            maxscore = score;
            sessionStorage.setItem("scramble-max-score", maxscore);
            document.getElementById('max-score').innerText = maxscore;
        }
    }
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
// finishBtn.addEventListener('click', function () {
//         const point = score; // Replace with the actual game score
//           fetch(`http://localhost:3000/updateUserscore`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username: loggedInUser, point })
//           });
//           window.location.href = '/dashboard.html';
//     });
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const userInfo = document.getElementById('user-info');

    if (loggedInUser) {
        userInfo.innerHTML = `Hello ${loggedInUser}! Play Word Scramble and improve your score`;
        const maxscore = sessionStorage.getItem("scramble-max-score") || 0;
        console.log(maxscore);
        document.getElementById('max-score').innerHTML=`${(maxscore)}`;
    } else {
        userInfo.innerHTML = 'Register here to save your score';
        document.getElementById('finish-game').addEventListener('click', () => {
        window.location.href = '/index.html';
        });
    }
    document.getElementById('finish-game').addEventListener('click', () => {
        //   const score = 50; // Replace with the actual game score
        console.log("chala?");
          fetch(`http://localhost:3000/updateUserscore`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ loggedInUser, maxscore })
          });
          
          window.location.href = `/dashboard.html?script1=true&max_score=${maxscore}`;
        });
        
});