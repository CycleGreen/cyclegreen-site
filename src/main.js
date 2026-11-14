import './style.css'

// ===== Mobile menu =====
const toggle = document.querySelector('.menu-toggle')
const nav = document.querySelector('#site-nav')

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open))
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  nav.classList.toggle('is-open', open)
}

toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true'
  setMenu(!isOpen)
})

// Close the menu after tapping a link
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false))
})