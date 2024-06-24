document.addEventListener('DOMContentLoaded', function () {
    // const loggedInUser = sessionStorage.getItem('loggedInUser');
    const userInfo = document.getElementById('user-info');
    const playButton = document.getElementById('play_scramble');
    const logoutBtn= document.getElementById('logout');
    const updateBtn= document.getElementById('update');
    const deleteBtn= document.getElementById('delete');
    const urlParams = new URLSearchParams(window.location.search);
    const score=urlParams.get("max_score") || 0;
    const games=urlParams.get("games") || 0;
    const username = urlParams.get("username");
    console.log(username+score+games);

    // Hello user! Welcome to Apna Playground!
    userInfo.innerHTML = `Hello ${username}! Welcome to Apna Playground!`;

    // Fetch user details
    fetchUserData(username);

    // Logout button    
    logoutBtn.addEventListener('click',function(){
    console.log("logout");
    window.location.href = '/index.html';
    });

    playButton.addEventListener('click', function () {
        window.location.href = `/scramble.html?script3=true&username=${username}`;
    });
    async function fetchUserData(username) {
        try {
            const response = await fetch(`/api/user/${username}`); // Adjust the URL to your backend endpoint
            console.log(response);
        if(response.ok){
            const users = await response.json();
            console.log(users);
            document.getElementById('max-score').textContent = users.maxScore;
            document.getElementById('games-played').textContent = users.numOfGames;
        }
        else{ // console.log("user"+username);
            console.error('Error fetching user data:', response.statusText);
        }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    // Update button 
    updateBtn.addEventListener('click', () => {
            updateUser(username);
    });
    async function updateUser(username) {
        const email = prompt('Enter new email:');
        const password = prompt('Enter new password:');
        if (username && email && password) {
            try {
                const response = await fetch(`/user/updateuser/${username}`, {
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
            deleteUser(username);
    });
    async function deleteUser(username) {
        const confirmation = confirm('Are you sure you want to delete this user?');
        if (confirmation) {
            try {
                const response = await fetch(`/deleteuser`, {
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
});
