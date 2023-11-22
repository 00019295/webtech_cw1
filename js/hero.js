function getData() {
    return fetch('../data/process.json')
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

getData().then((items) => {
    window.addEventListener('scroll', () => populateProcessItemsOnScroll(items));
});

function populateProcessItemsOnScroll(items) {
    if (window.scrollY > 400) {
        let processItems = document.querySelector('#delivery .process-items');
        processItems.innerHTML = items.map((item, index) => {
            return `
                <div class="process-item">
                    <div class="process-item-image">
                        <img src="media/hero/process_${index + 1}.svg" alt="${item.title}">
                    </div>
                    <h5 class="process-item-title">${item.title}</h5>
                    <p class="process-item-description">${item.description}</p>
                </div>
            `
        })
    }
}


