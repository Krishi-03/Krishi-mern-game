const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
finishBtn = document.querySelector(".finish-game");
scoreArea = document.querySelector(".score");
let correctWord, timer;
let score = 0,maxscore=0; 
// let maxscore = sessionStorage.getItem("scramble-max-score") || 0;
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
            // sessionStorage.setItem("scramble-max-score", maxscore);
            document.getElementById('max-score').innerText = maxscore;
        }
    }
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    const userInfo = document.getElementById('user-info');
    userInfo.innerHTML = `Hello ${username}! Play Word Scramble`;
    fetchUserData(username);
    async function fetchUserData(username) {
    try {
        const response = await fetch(`/api/user/${username}`); // Adjust the URL to your backend endpoint
        console.log(response);
    if(response.ok){
        const users = await response.json();
        console.log(users);
        document.getElementById('max-score').textContent = users.maxScore;
        // document.getElementById('games-played').textContent = users.numOfGames;
    }
    else{ // console.log("user"+username);
        console.error('Error fetching user data:', response.statusText);
    }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    }
    console.log(maxscore);
    document.getElementById('max-score').innerHTML=`${(maxscore)}`;
    console.log(username+maxscore);
    finishBtn.addEventListener('click', async () => {
        //   const score = 50; // Replace with the actual game score
        // const username=username;
        console.log(username+maxscore);
        try {
    // Perform AJAX request to the server register endpoint
    const response = await fetch('/updateUserscore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, maxscore }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("result"+result.maxScore+result.numOfGames);
    const key=result.maxScore;
    const num=result.numOfGames;
    console.log(username+key+num);
    sessionStorage.clear();
    window.location.href = `/dashboard.html?script1=true&username=${username}`;
    
  } catch (error) {
    console.error('Error:', error);
    // Handle errors here
    alert('An unexpected error occurred. Please try again later.');
  }
});
    
        
});