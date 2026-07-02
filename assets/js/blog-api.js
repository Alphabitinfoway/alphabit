
document.addEventListener('DOMContentLoaded', () => {

    function slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

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

            const cleanTitle = post.title ? post.title.replace(/&nbsp;/g, ' ').replace(/\u00a0/g, ' ') : '';
            const postSlug = post.slug || slugify(cleanTitle);

            article.innerHTML = `
              <div class="feed-thumb">
                  <img src="${imageUrl}" alt="${cleanTitle}" class="fade-in" />
              </div>

              <div class="feed-card-footer">
                  <p>${cleanTitle}</p>
                  <a href="${postSlug}" class="feed-arrow">↗</a>
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





