
document.addEventListener('DOMContentLoaded', () => {

    const blogContainer = document.getElementById('blog-feed-container');

    if (!blogContainer) {
        console.error('Blog container not found!');
        return;
    }

    const API_URL = `${BASE_URL}/users/getBlogs`;

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

            const imageUrl = post.image && post.image.startsWith("http")
                ? post.image
                : post.image
                    ? `${BASE_URL}/uploads/${post.image}`
                    : `https://picsum.photos/seed/${post._id}/400/300`;

            const article = document.createElement('article');
            article.className = 'feed-card';

            article.innerHTML = `
              <div class="feed-thumb">
                  <img src="${imageUrl}" alt="${post.title}" class="fade-in" />
              </div>

              <div class="feed-card-footer">
                  <p>${post.title}</p>
                  <a href="blogdetails?id=${post._id}" class="feed-arrow">↗</a>
              </div>
          `;

            const img = article.querySelector('img');
            img.onload = () => img.classList.add('loaded');
            if (img.complete) img.classList.add('loaded');

            blogContainer.appendChild(article);
        });
    }

    fetchBlogPosts();

});



// get message from contact form

