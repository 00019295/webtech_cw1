function getDeliveryItems() {
    return fetch('../data/delivery-items.json')
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

getDeliveryItems().then((items) => {
    populateDeliveryItems(items)
});

function populateDeliveryItems(items) {
    let deliveryItems = document.getElementById('delivery-items');

    const itemsHtml = items.map((item, index) => `
        <div class="delivery-item">
            <div 
            style="background-image: url('/media/recent-deliveries/delivery-item-${index + 1}.jpeg')"
            class="delivery-item-image"
            >
            
</div>
            <div class="delivery-item-content">
                <h5>${item.title}</h5>
                <div class="locations">
                    <div class="departure">
                        <img src="/media/recent-deliveries/departure.png" alt="Departure Icon">
                        <p>${item.departure}</p>
                    </div>
                    <div class="destination">
                        <img src="/media/recent-deliveries/destination.png" alt="Destination Icon">
                         <p>${item.destination}</p>
                    </div>
                    <div>
                        <h6 style="font-size: 1rem">Read more -></h6>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Sets innerHTML of the container with the generated HTML
    deliveryItems.innerHTML = itemsHtml;
}


