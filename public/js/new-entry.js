async function createNewEnrty(e)  {
    e.preventDefault();
    
    const entry_title = $('#input-box-title').value.trim()
    const entry_content = $('#input-box').value.trim()

    if (title && postContent) {
        const response = await fetch ('api/entries', {
            method: 'post',
            body: JSON.stringify({
                entry_title,
                entry_content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    if(response.ok) {
        console.log('New Post Created!')
        document.location.replace('/')
       } else {
        console.log('something went worng')
        window.alert('Something went wrong')
       }
}

// Add event listener