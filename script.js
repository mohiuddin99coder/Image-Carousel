let imageAPI1 = `https://api.unsplash.com/photos/random?client_id=VUVYw0LK2mpBsk5brcR14DcIQpVvh_kXrh0jLZTVDTU`
let imageAPI2 = `https://api.unsplash.com/photos/random?client_id=o9aJvfrmD0Jqs3O83cAhS9JF_-4LXHKjl_3uuaxuGWI`
let imageAPI3 = `https://api.unsplash.com/photos/random?client_id=zTLe2kcjLOgR_4XdYYjY7kWOKgUrGbjP6JbhHBu2m6I`

let image1 = document.querySelector('#image-1')
let image2 = document.querySelector('#image-2')
let image3 = document.querySelector('#image-3')

let messageBox = document.querySelector('.messageBox')
let overlay = document.querySelector('.overlay')
let errMsg = document.querySelector('.errMsg')

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener('click', () => {                                           // 0-prev, 1-next
    const offset = button.dataset.carouselButton === "next" ? 1 : -1                 // if button == next => offset = 1 OR if button == prev => offset = -1
    const slides = button.closest('[data-carousel]').querySelector('[data-slides]')  // Targeting slides container

    const activeSlide = slides.querySelector("[data-active]")                        // Storing active slide in a variable
    let newIndex = [...slides.children].indexOf(activeSlide) + offset                // Creating newIndex, for slides to show after clicking on buttons
    if (newIndex < 0) newIndex = slides.children.length - 1                          // Checking if newIndex < 0, then changing the newIndex to last slide Index
    if (newIndex >= slides.children.length) newIndex = 0                             //Checking if newIndex greater Or equal to SildesLength, if true changing it to first Slide Index 
    slides.children[newIndex].dataset.active = true                                  // giving active attribute to newIndex Slide
    delete activeSlide.dataset.active                                                // deleting active attribute from previous slide
  })
})

function getImage(imageAPI, image) {
  fetch(imageAPI)
    .then((response) => response.json())
    .then((data) => {
      image.src = data.urls.regular
    })
    .catch((error) => {
      console.log("Error: " + error)
      errMsg.textContent = error
      messageBox.classList.remove('d-none')
      overlay.classList.remove('d-none')
    })
}
function displayImg() {
  getImage(imageAPI1, image1)
  getImage(imageAPI2, image2)
  getImage(imageAPI3, image3)
}

let changeImg = document.querySelector('.changeImg');
changeImg.addEventListener('click', () => {
  displayImg()
})

// displayImg()