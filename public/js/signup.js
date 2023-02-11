const { application } = require("express")

async function signupForm(e) {
    e.preventDefault()

    const name = $('#name').value.trim()
    const username =$('#username').value.trim()
    const email = $('#email').value.trim()
    const password = $('#password').value.trim()
    const bio = $('#bio').value.trim()
    const location = $('#location').value.trim()

    if (name && username && email && password && bio && location) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify( {
                username,
                password,
                name,
                password,
                bio,
                location
            }),
            headers: {
                'Content-Type': 'application/json'
            }
       });
       if(response.ok) {
        console.log('new user creatd!')
        document.location.replace('/')
       }
    }






}