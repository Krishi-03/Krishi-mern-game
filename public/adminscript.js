document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();
    const logoutBtn = document.getElementById('logout');
    logoutBtn.addEventListener('click',function(){
        sessionStorage.clear();
        window.location.href = '/index.html';
    });
});

async function fetchUserData() {
    try {
        const response = await fetch(`http://localhost:3000/users`); // Adjust the URL to your backend endpoint
        console.log(response);
        if(response.ok){
        const users = await response.json();
        console.log(users);
        const tableBody = document.querySelector('#userTable tbody');

        users.forEach(user => {
            if (user.isAdmin == false) {
                const row = document.createElement('tr');

                const usernameCell = document.createElement('td');
                usernameCell.textContent = user.username;
                row.appendChild(usernameCell);

                const emailCell = document.createElement('td');
                emailCell.textContent = user.email;
                row.appendChild(emailCell);

                const passwordCell = document.createElement('td');
                passwordCell.textContent = user.password;
                row.appendChild(passwordCell);

                const maxScoreCell = document.createElement('td');
                maxScoreCell.textContent = user.maxScore;
                row.appendChild(maxScoreCell);

                const gamesPlayedCell = document.createElement('td');
                gamesPlayedCell.textContent = user.numOfGames;
                row.appendChild(gamesPlayedCell);

                tableBody.appendChild(row);
            }
        });
    }
    else 
    {
        // console.log("user"+username);
        console.error('Error fetching user data:', response.statusText);
    }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}
