const selectBtn = document.querySelector('.select-btn'),
items = document.querySelectorAll('.container .item')

console.log(selectBtn, items)

selectBtn.addEventListener('click', () => {
    selectBtn.classList.toggle('open')
})

items.forEach(item => {
    item.addEventListener('click', e => {
        item.classList.toggle('checked')

        let checked = document.querySelectorAll('.checked'),
        btnText = document.querySelector('.btn-text')
        console.log(checked)
        if(checked && checked.length > 0) {
            btnText.textContent = `${checked.length} Selected`
        } else {
            btnText.textContent = 'Select Language'
        }
    })
})