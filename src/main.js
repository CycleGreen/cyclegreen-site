import './style.css'
import { supabase } from './supabase.js'

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
// ===== Pilot form =====
const form = document.querySelector('#pilot-form')
const statusEl = document.querySelector('#form-status')
const submitBtn = form.querySelector('button[type="submit"]')

form.addEventListener('submit', async (event) => {
  event.preventDefault() // stop the page reloading

  const data = new FormData(form)

  // A bot filled the hidden field: pretend it worked, save nothing
  if (data.get('website')) {
    form.reset()
    return
  }

  submitBtn.disabled = true
  submitBtn.textContent = 'Sending…'
  statusEl.textContent = ''

  const { error } = await supabase.from('enquiries').insert({
    name: data.get('name').trim(),
    organisation: data.get('organisation').trim() || null,
    contact: data.get('contact').trim(),
    message: data.get('message').trim() || null,
  })

  submitBtn.disabled = false
  submitBtn.textContent = 'Start a conversation'

  if (error) {
    console.error(error)
    statusEl.textContent = "Sorry, that didn't send. Please try again, or email us directly."
  } else {
    form.reset()
    statusEl.textContent = "Thank you. We've received your message and will be in touch."
  }
})