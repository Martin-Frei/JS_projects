const postContainer = document.getElementById("posts");

async function loadJSON() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);

    // Template für jeden Post verwenden
    const htmlContent = data.map(post => createPostHTML(post)).join('');
    postContainer.innerHTML = htmlContent;

  } catch (error) {
    console.error('Fehler beim API-Aufruf:', error.message);
    document.getElementById('error').innerHTML = 'Error while loading';
  }
}


loadJSON();



function createPostHTML(post) {
    return `
        <div class="post">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <small>User: ${post.userId} | Post: ${post.id}</small>
        </div>
    `;
}