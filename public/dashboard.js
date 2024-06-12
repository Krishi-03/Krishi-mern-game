document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const userInfo = document.getElementById('user-info');
    const playButton = document.getElementById('play_scramble');
    const logoutBtn= document.getElementById('logout');
    const updateBtn= document.getElementById('update');
    const deleteBtn= document.getElementById('delete');
    if (loggedInUser) {
        // console.log("gaya?"+loggedInUser);
        userInfo.innerHTML = `Hello ${loggedInUser}! Welcome to Apna Playground!`;
        fetchUserData(loggedInUser);
        logoutBtn.addEventListener('click',function(){
        sessionStorage.clear();
        window.location.href = '/index.html';
    });
    } else {
        userInfo.innerHTML = 'Not logged in';
    }

    playButton.addEventListener('click', function () {
        window.location.href = '/scramble.html';
    });
    async function fetchUserData(username) {
    try {
        // username=JSON.stringify(username);
        const response = await fetch(`api/user/${username}`);
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            displayUserData(data);
        } else {
            // console.log("user"+username);
            console.error('Error fetching user data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    }

    updateBtn.addEventListener('click', function () {
        async function updateUserData(username) {
    try {
        // username=JSON.stringify(username);
        const response = await fetch(`api/user/${username}`);
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            displayUserData(data);
        } else {
            // console.log("user"+username);
            console.error('Error fetching user data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    }
    });

    deleteBtn.addEventListener('click', function () {
        window.location.href = '/scramble.html';
    async function fetchUserData(username) {
    try {
        // username=JSON.stringify(username);
        const response = await fetch(`api/user/${username}`);
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            displayUserData(data);
        } else {
            // console.log("user"+username);
            console.error('Error fetching user data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    }
    });

function displayUserData(data) {
    document.getElementById('max-score').textContent = data.maxScore;
    const mxsc=data.maxScore;
    document.getElementById('games-played').textContent = data.numOfGames;
    sessionStorage.setItem("scramble-max-score",mxsc);
}
});
