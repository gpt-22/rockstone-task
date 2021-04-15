// notes page

const form = document.querySelector('.form');
const textArea = document.querySelector('.textarea')
const texts = document.querySelector('.texts')

const state = {
  texts: [
    'text 1', 
    'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor', 
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui fuga architecto aut soluta consequuntur earum!',
    'lorem ipsum dolor'
  ]
}


const animateText = paragraph => {
  let text = paragraph.innerText
  paragraph.innerText = null
  let to = text.length
  let from = 0 

  const delay = 200
  setTimeout(() => {
    animate({
      duration: 2000,
      timing: timeFraction => Math.pow(timeFraction, 2),
      draw: progress => {
        let result = (to - from) * progress + from;
        paragraph.innerText = text.substr(0, Math.ceil(result))
      }
    })
  }, delay)
}

const createTextNode = (text, animate) => {
  const textNode = document.createElement('div')
  textNode.className = 'texts__item text'
  
  const paragraph = document.createElement('p')
  paragraph.innerText = text
  if (animate) {
    animateText(paragraph)
  }
  
  textNode.appendChild(paragraph)

  return textNode
} 


state.texts.forEach(text => texts.appendChild(createTextNode(text, false)))

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const value = textArea.value.trim()

  if (value) {
    texts.appendChild(createTextNode(value, true))
    textArea.value = ""
    textArea.focus()
  }
})

textArea.focus()


// time page

const timeNode = document.querySelector('.time')

setInterval(() => {
  timeNode.innerText = (new Date()).toLocaleTimeString()
}, 1000)


// swipe

const pagesContainer = document.querySelector('.pages-container')
const pages = document.getElementsByClassName('page')

let startX


const animateSwipe = (duration, type) => {
  let start = null

  const animateStep = (time) => {
    if (!start) start = time
    const scrollStep = screen.width / (duration / 1000 * 60)
    type === 'swipe' 
      ? pagesContainer.scrollLeft += scrollStep 
      : pagesContainer.scrollLeft -= scrollStep
    const progress = time - start
    if (progress < duration) requestAnimationFrame(animateStep)
  }
  
  requestAnimationFrame(animateStep)
}

const handleTouchStart = e => {
  startX = e.touches[0].clientX
}

const handleTouchEnd = e => {
  const clientX = e.changedTouches[0].clientX
  const change = startX - clientX
  const threshold = screen.width / 4

  const duration = 500

  if (change >= threshold) {  
    animateSwipe(duration, 'swipe')  
  } else {
    animateSwipe(duration)
  }
}


for (let page of pages) {
  page.addEventListener('touchstart', handleTouchStart, { passive: true })
  page.addEventListener('touchend', handleTouchEnd, { passive: true })
}
