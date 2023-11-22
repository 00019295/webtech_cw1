function getBlogItems() {
    return fetch('../data/blogs.json')
        .then(response => response.json())
        .then(data => {
            // fetch the data only once when page loaded
            return data.data
        })
        .catch(error => {
            console.error('Error:', error);
            return [];
        });
}

getBlogItems().then((items) => {
    populateBlogItems(items)
    populateCategoryItems(items)
    enableBlogSearch(items)
    enableBlogFilterOnCategoryClick(items)
});

function populateBlogItems(items) {
    let blogItems = document.getElementById('blog-items');
    let categoryItems = document.getElementById('blog-categories');
    blogItems.innerHTML = '';
    items.forEach((item, index) => {
        blogItems.innerHTML += `<a href="pages/BlogDetails.html" style="text-decoration: none;">
    <div class="blog-item">
        <div class="blog-img">
            <img src="/media/blogs/blog-img.jpeg" alt="${item.title}">
        </div>
        <div class="blog-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
        <div class="blog-likes">
            <div>
                <img src="/media/blogs/category-icon.svg" alt="Category Icon">
                <span>${item.category}</span>
            </div>
            
            <div>
                <img src="/media/blogs/comment-icon.png" alt="Comment Icon">
                <span>${item.comments_count}</span>
            </div>
        </div>
    </div>
</a>`
    })
}

function populateCategoryItems(items) {
    let categoryItems = document.getElementById('blog-categories');

    let categories = items.map((item) => {
        return `
            <div class="category-item">
                <span class="category-icon">🔸</span>
                <span class="category-name">${item.category}</span>
            </div>
        `
    })

    categoryItems.innerHTML = categories.join('');
}

function enableBlogFilterOnCategoryClick(items) {
    let categoryItems = document.querySelectorAll('#blog-categories .category-item');
    let filterInfo = document.getElementById('filter-info');
    categoryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            filterInfo.innerHTML = `Filtering by 
<span class="highlight">${item.querySelector('.category-name').innerText}</span>`
            let category = item.querySelector('.category-name').innerText;
            let filteredItems = items.filter((item) => {
                return item.category.toLowerCase().includes(category.toLowerCase())
            })
            console.log(filteredItems)
            populateBlogItems(filteredItems)
        })
    })
}

function enableBlogSearch(items) {
    let searchInput = document.getElementById('blog-search');
    let searchBtn = document.getElementById('blog-search-btn');
    let filterInfo = document.getElementById('filter-info');
    searchBtn.addEventListener('click', (event) => {
        if (searchInput.value.trim().length <= 0) {
            return alert('Please enter a search query')
        }
        filterInfo.innerHTML = '';
        let searchValue = searchInput.value;
        let filteredItems = items.filter((item) => {
            return item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.description.toLowerCase().includes(searchValue.toLowerCase())
        })
        if (filteredItems.length === 0) {
            let blogItems = document.getElementById('blog-items');
            blogItems.innerHTML = '<h3>No results found</h3>'
        } else {
            populateBlogItems(filteredItems)
        }
    })
}