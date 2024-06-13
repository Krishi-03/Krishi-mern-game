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

                const usertype = document.createElement('td');
                usertype.textContent = user.isAdmin;
                if(user.isAdmin)
                    usertype.textContent = 'Admin';
                else
                    usertype.textContent = 'User';
                row.appendChild(usertype);

                const actionsCell = document.createElement('td');
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.className = 'update-button';
                updateButton.addEventListener('click', () => {
                    updateUser(user);
                });
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-button';
                deleteButton.addEventListener('click', () => {
                    deleteUser(user.username);
                });
                actionsCell.appendChild(updateButton);
                actionsCell.appendChild(deleteButton);
                row.appendChild(actionsCell);

                tableBody.appendChild(row);
        });
    }
    else{ // console.log("user"+username);
        console.error('Error fetching user data:', response.statusText);
    }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function updateUser(user) {
    const username = user.username;
    const email = prompt('Enter new email:', user.email);
    const password = prompt('Enter new password:', user.password);
    if (username && email && password && !user.isAdmin) {
        try {
            const response = await fetch(`http://localhost:3000/admin/updateuser/${username}`, {
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
                location.reload();
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
}
