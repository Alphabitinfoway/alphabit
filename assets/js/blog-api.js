
document.addEventListener('DOMContentLoaded', () => {

    const blogContainer = document.getElementById('blog-feed-container');

    if (!blogContainer) {
        console.error('Blog container not found!');
        return;
    }

    const API_URL = 'https://alphabit-web-1.onrender.com/users/getBlogs';

    async function fetchBlogPosts() {

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const posts = await response.json();

            renderBlogPosts(posts.slice(0, 6));

        } catch (error) {

            console.error('Error fetching blog posts:', error);

            blogContainer.innerHTML =
                '<p class="error-message">Failed to load blog posts.</p>';
        }
    }

    function renderBlogPosts(posts) {

        blogContainer.innerHTML = '';

        posts.forEach(post => {

            const imageUrl = post.image
                ? post.image
                : `https://picsum.photos/seed/${post._id}/400/300`;

            const article = document.createElement('article');
            article.className = 'feed-card';

            article.innerHTML = `
              <div class="feed-thumb">
                  <img src="${imageUrl}" alt="${post.title}" />
              </div>

              <div class="feed-card-footer">
                  <p>${post.title}</p>
                  <a href="blogdetails.shtml?id=${post._id}" class="feed-arrow">↗</a>
              </div>
          `;

            blogContainer.appendChild(article);
        });
    }

    fetchBlogPosts();

});



// get message from contact form

