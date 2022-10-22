const dropdown = document.querySelector('.dropdown')

dropdown.addEventListener('click', dropdownActive)

function dropdownActive(){
    dropdown.classList.toggle('active')
}