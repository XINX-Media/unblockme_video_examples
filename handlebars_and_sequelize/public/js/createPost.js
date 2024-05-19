const createPostForm = document.getElementById('createPostForm');

createPostForm.addEventListener('submit', async (e) => {
    console.log('submit')
    e.preventDefault();

    const title = document.getElementById('postTitle').value.trim();
    const post_content = document.getElementById('postContent').value.trim();

    if (title && post_content) {
        console.log(title, post_content)
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, post_content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {

        } else {
            alert('Failed to create post');
        }
    }
})