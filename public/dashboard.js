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
    const urlParams = new URLSearchParams(window.location.search);
        const isScript1  = urlParams.get("script1") === "true";
        if (isScript1) {
            const score = urlParams.get("max_score");
            console.log("dashy"+score);
        }
    }

    // Update button 
    updateBtn.addEventListener('click', () => {
            updateUser(loggedInUser);
    });
    async function updateUser(username) {
        const email = prompt('Enter new email:');
        const password = prompt('Enter new password:');
        if (username && email && password) {
            try {
                const response = await fetch(`http://localhost:3000/user/updateuser/${username}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    })
                });
                if (response.ok) {
                    alert('User updated successfully');
                    location.reload();
                } else {
                    console.error('Error updating user:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
    }   

    deleteBtn.addEventListener('click', () => {
            deleteUser(loggedInUser);
    });
    async function deleteUser(username) {
        const confirmation = confirm('Are you sure you want to delete this user?');
        if (confirmation) {
            try {
                const response = await fetch(`http://localhost:3000/deleteuser`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                    })
                });

                if (response.ok) {
                    alert('User deleted successfully');
                    window.location.href = '/index.html';
                } else {
                    console.error('Error deleting user:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    }   


function displayUserData(data) {
    document.getElementById('max-score').textContent = data.maxScore;
    const mxsc=data.maxScore;
    document.getElementById('games-played').textContent = data.numOfGames;
    sessionStorage.setItem("scramble-max-score",mxsc);
}
});
