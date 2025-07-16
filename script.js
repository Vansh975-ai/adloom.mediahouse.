// Add at the beginning of the file
document.addEventListener("DOMContentLoaded", () => {
  // Add page loaded class to trigger floating animations
  setTimeout(() => {
    document.body.classList.add("page-loaded")
  }, 100)
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Observe all elements with animate-on-scroll class
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el)
})

// Counter Animation
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    element.textContent = Math.floor(start)

    if (start >= target) {
      element.textContent = target + "+"
      clearInterval(timer)
    }
  }, 16)
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".stat-number")
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-target"))
          animateCounter(counter, target)
        })
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const statsSection = document.querySelector(".stats")
if (statsSection) {
  statsObserver.observe(statsSection)
}

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Success message
  alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`)

  // Reset form
  this.reset()
})

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const navLinks = document.querySelector(".nav-links")

mobileMenuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-active")
  mobileMenuToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("mobile-active")
    mobileMenuToggle.classList.remove("active")
  })
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav") && navLinks.classList.contains("mobile-active")) {
    navLinks.classList.remove("mobile-active")
    mobileMenuToggle.classList.remove("active")
  }
})

// Header Background on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
  } else {
    header.style.backgroundColor = "#ffffff"
  }
})

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroImage = document.querySelector(".hero-image img")
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Enhanced floating text animation on scroll
const floatingTextObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Observe all floating text elements
document
  .querySelectorAll(".floating-text, .floating-text-delay-1, .floating-text-delay-2, .floating-text-delay-3")
  .forEach((el) => {
    floatingTextObserver.observe(el)
  })

// Enhanced loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Trigger floating animations for visible elements
  const visibleElements = document.querySelectorAll(
    ".floating-text, .floating-text-delay-1, .floating-text-delay-2, .floating-text-delay-3",
  )
  visibleElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.animationPlayState = "running"
    }, index * 100)
  })
})
