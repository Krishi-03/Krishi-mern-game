
document.addEventListener('DOMContentLoaded', function () {
    // Assuming the form has an ID of 'sub_id'
    const loginForm = document.getElementById('sub_id');
  
    // console.log("yaaaar!");
    loginForm.addEventListener('click', async function (event) {
      event.preventDefault();
const p_name=document.getElementById('fusername').value;
const p_pass=document.getElementById('fpassword').value;
console.log(p_name+ p_pass);
if (!p_name || !p_pass) {
    alert('Username and password are required');
    console.error('Username and password are required');
    return;
  }
    try {
        // Perform AJAX request to the check if user is admin
        const response = await fetch('/adminlogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ p_name, p_pass }),
        });
        console.log(p_name+p_pass);
        const result = await response.json();
        if (!response.ok) {
          // alert(result.message);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Response from server:', result);
        if (result.success) {
          console.log('Admin Login successful!');
          const usr=document.getElementById('fusername').value;
          console.log("dashy"+usr);
          window.location.href = `/admindashboard.html`;
        }
        else{
          try {
      // Perform AJAX request to the server login endpoint
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ p_name, p_pass }),
      });
      console.log(p_name+p_pass);
      const result = await response.json();
      if (!response.ok) {
        // alert(result.message);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }


      console.log('Response from server:', result);

      if (result.success) {
        console.log('Login successful!');
        const usr=document.getElementById('fusername').value;
        console.log("dashy"+usr);
        window.location.href = `/dashboard.html?script2=true&username=${usr}`;
      }
      else{
        alert(result.message);
      }
    }

    catch (error) {
      console.error('Error:', error);
      // Handle errors here
      alert('An unexpected error occurred. Please try again later.');
    }
          // alert(result.message);
        }
      }
      catch (error) {
        console.error('Error:', error);
        // Handle errors here
        alert('An unexpected error occurred. Please try again later.');
      }
    

});
});