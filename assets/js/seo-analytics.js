// SEO and Analytics Enhancement Script

// Declare gtag variable
const gtag =
  window.gtag ||
  (() => {}) // Placeholder for gtag function // Placeholder for gtag function

// Track page performance
window.addEventListener("load", () => {
  // Send Core Web Vitals to analytics
  if ("PerformanceObserver" in window) {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        gtag("event", "LCP", {
          event_category: "Web Vitals",
          value: Math.round(entry.startTime),
          non_interaction: true,
        })
      }
    }).observe({ entryTypes: ["largest-contentful-paint"] })

    // First Input Delay
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        gtag("event", "FID", {
          event_category: "Web Vitals",
          value: Math.round(entry.processingStart - entry.startTime),
          non_interaction: true,
        })
      }
    }).observe({ entryTypes: ["first-input"] })

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      let clsValue = 0
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      gtag("event", "CLS", {
        event_category: "Web Vitals",
        value: Math.round(clsValue * 1000),
        non_interaction: true,
      })
    }).observe({ entryTypes: ["layout-shift"] })
  }
})

// Track scroll depth
let maxScroll = 0
window.addEventListener("scroll", () => {
  const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
  if (scrollPercent > maxScroll) {
    maxScroll = scrollPercent
    if (maxScroll % 25 === 0) {
      // Track at 25%, 50%, 75%, 100%
      gtag("event", "scroll_depth", {
        event_category: "Engagement",
        event_label: maxScroll + "%",
        value: maxScroll,
      })
    }
  }
})

// Track CTA clicks
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("click", function () {
    gtag("event", "cta_click", {
      event_category: "Conversion",
      event_label: this.textContent.trim(),
      value: 1,
    })
  })
})

// Track form interactions
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  // Track form start
  contactForm.addEventListener(
    "focusin",
    () => {
      gtag("event", "form_start", {
        event_category: "Form",
        event_label: "Contact Form",
      })
    },
    { once: true },
  )

  // Track form submission
  contactForm.addEventListener("submit", () => {
    gtag("event", "form_submit", {
      event_category: "Form",
      event_label: "Contact Form",
      value: 1,
    })
  })
}

// Track video plays (if you add videos later)
function trackVideoPlay(videoTitle) {
  gtag("event", "video_play", {
    event_category: "Video",
    event_label: videoTitle,
    value: 1,
  })
}

// Track external links
document.querySelectorAll('a[href^="http"]').forEach((link) => {
  if (!link.href.includes(window.location.hostname)) {
    link.addEventListener("click", function () {
      gtag("event", "external_link", {
        event_category: "Outbound",
        event_label: this.href,
        transport_type: "beacon",
      })
    })
  }
})

// Track WhatsApp clicks
document.querySelector(".whatsapp-float")?.addEventListener("click", () => {
  gtag("event", "whatsapp_click", {
    event_category: "Contact",
    event_label: "WhatsApp Float Button",
    value: 1,
  })
})

// Enhanced error tracking
window.addEventListener("error", (e) => {
  gtag("event", "javascript_error", {
    event_category: "Error",
    event_label: e.message,
    value: 1,
    non_interaction: true,
  })
})

// Track page visibility
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    gtag("event", "page_hidden", {
      event_category: "Engagement",
      non_interaction: true,
    })
  }
})
