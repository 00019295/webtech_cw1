function toggleHeaderOnScroll() {
    // Add 'sticky' class if scroll is more than 100px, else remove it
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
}

function toggleMenuDropdown() {
    // Toggle 'active' class on menu dropdown
    let menu = document.getElementById('menu-dropdown');
    menu.classList.toggle('active');
}


window.addEventListener('scroll', toggleHeaderOnScroll);
document.getElementById('menu-dropdown-toggler').addEventListener('click', toggleMenuDropdown)
