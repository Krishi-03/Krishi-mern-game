document.addEventListener('DOMContentLoaded', function () {
    // Assuming the form has an ID of 'sub_id'
    const registrationForm = document.getElementById('sub_id2');
  
    registrationForm.addEventListener('click', async function (event) {
      event.preventDefault();


const p_name=document.getElementById('fusername').value;
const p_pass=document.getElementById('fpassword').value;
const p_email=document.getElementById('femail').value;

console.log(p_name+ p_pass+p_email);



  // Basic form validation
  if (!p_name || !p_email || !p_pass) {
    console.error('Username, email, and password are required for registration');
    return;
  }

  try {
    // Perform AJAX request to the server register endpoint
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_name, p_email, p_pass }),
    });
    console.log(response.ok);
    if (!response.ok) {
      alert('Username already exists. Please choose a different one.');
    }
    const result = await response.json();
    console.log("chala?")

    if (result.success) {
      console.log('Registration successful!');
      alert(result.message);
      sessionStorage.setItem('loggedInUser', p_name)
      window.location.href = "/index.html";
    } 
    else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle errors here
    alert('Username already exists. Please choose a different one.');
  }
 

});
});