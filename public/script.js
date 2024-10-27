document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the values from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send data to the serverless function
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();
    document.getElementById('message').innerText = result.message;

    if (response.ok) {
        document.getElementById('registrationForm').reset(); // Reset the form
    }
});
