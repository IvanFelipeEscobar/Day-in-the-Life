const editUser = async (event) => {
    event.preventDefault()
    const name = document.getElementById(`newName`).value.trim()
    const user_name = document.getElementById(`newUserName`).value.trim()
    const email = document.getElementById(`newUserEmail`).value.trim()
    const location = document.getElementById(`userLocation`).value.trim()
    const bio = document.getElementById(`userBio`).value
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]

    const profile_pic = document.getElementById(`profile_pic`).value
     

    const postData = await fetch(`/api/users/${id}`, {
        method: `PUT`,
        body: JSON.stringify({ id, name, user_name, email, location, bio, profile_pic}),
        headers: { 'Content-Type': 'application/json'}
    })
    postData.ok ?
    document.location.replace(`/dashboard`) :
    console.log(postData.statusText)}

document.getElementById(`editUserSubmit`).addEventListener(`click`, editUser)