const { application } = require("express")
const { post } = require("../../controllers/api/usersRoutes")

async function login(e) {
    const email = $('#email').value.trim()
    const password = $('#password').value.trim()

    if(username && password) {
        const response = await fetch('api/user/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': "application/json"
            }
        });
        if(response.ok) {
           console.log('Logged in!')
           document.location.replace('/') 
        }
}
}

// add event listener
        