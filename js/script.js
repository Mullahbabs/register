document.addEventListener("DOMContentLoaded", function () {
  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const body = document.body;

  darkModeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    // Save user preference
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
  }

  // Hero Carousel
  const heroSlides = document.querySelectorAll(".hero-slide");
  let currentSlide = 0;

  function showSlide(n) {
    heroSlides.forEach((slide) => slide.classList.remove("active"));
    heroSlides[n].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
  }

  // Change slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Gallery Tabs
  const galleryTabs = document.querySelectorAll(".gallery-tab");
  const galleryContents = document.querySelectorAll(".gallery-content");

  galleryTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Update active tab
      galleryTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding content
      galleryContents.forEach((content) => {
        content.classList.remove("active");
        if (content.id === `gallery-${tabId}`) {
          content.classList.add("active");
        }
      });
    });
  });

  // Registration Modal
  const registrationModal = document.getElementById("registration-modal");
  const successModal = document.getElementById("success-modal");
  const registerTriggers = document.querySelectorAll(
    ".register-trigger, #register-btn"
  );
  const closeRegistrationModal = document.getElementById(
    "close-registration-modal"
  );
  const closeSuccessModal = document.getElementById("close-success-modal");

  registerTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      registrationModal.classList.add("active");
    });
  });

  closeRegistrationModal.addEventListener("click", function () {
    registrationModal.classList.remove("active");
  });

  closeSuccessModal.addEventListener("click", function () {
    successModal.classList.remove("active");
  });

  // Payment method selection
  const paymentMethods = document.querySelectorAll(".payment-method");
  const cardDetails = document.getElementById("card-details");

  paymentMethods.forEach((method) => {
    method.addEventListener("click", function () {
      paymentMethods.forEach((m) => m.classList.remove("active"));
      this.classList.add("active");

      if (this.dataset.method === "card") {
        cardDetails.style.display = "block";
      } else {
        cardDetails.style.display = "none";
      }
    });
  });

  // Form submission
  const registrationForm = document.getElementById("registration-form");

  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simple validation
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const country = document.getElementById("country").value;
    const ticketType = document.getElementById("ticket-type").value;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !country ||
      !ticketType
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Show success modal
    registrationModal.classList.remove("active");
    successModal.classList.add("active");
  });

  // Animation on scroll
  const animateElements = document.querySelectorAll(
    ".about-content, .gallery, .sponsors"
  );

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.classList.add("animated");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Check on initial load

  // Close modals when clicking outside
  document.addEventListener("click", function (e) {
    if (e.target === registrationModal) {
      registrationModal.classList.remove("active");
    }
    if (e.target === successModal) {
      successModal.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Set the event date (November 15, 2023)
  const eventDate = new Date("2026-06-15T09:00:00");

  // Countdown function
  function updateCountdown() {
    const now = new Date();
    const timeRemaining = eventDate - now;

    // Calculate time units
    const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Update the countdown display
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days < 10 ? "0" + days : days;
    document.getElementById("hours").textContent =
      hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").textContent =
      minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").textContent =
      seconds < 10 ? "0" + seconds : seconds;
  }

  // Initial call
  updateCountdown();

  // Update countdown every second
  setInterval(updateCountdown, 1000);

  // Calendar functionality
  const eventData = {
    title: "AfroVibes Summit 2023",
    description:
      "Join us for an unforgettable experience celebrating African innovation and culture.",
    location: "Accra, Ghana",
    start: eventDate,
    end: new Date(eventDate.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days later
  };

  // Google Calendar
  document.getElementById("google-cal").addEventListener("click", function (e) {
    e.preventDefault();
    const start = eventData.start.toISOString().replace(/-|:|\.\d+/g, "");
    const end = eventData.end.toISOString().replace(/-|:|\.\d+/g, "");

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventData.title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      eventData.description
    )}&location=${encodeURIComponent(eventData.location)}`;

    window.open(url, "_blank");
  });

  // Outlook Calendar
  document
    .getElementById("outlook-cal")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const start = eventData.start.toISOString().replace(/-|:|\.\d+/g, "");
      const end = eventData.end.toISOString().replace(/-|:|\.\d+/g, "");

      const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
        eventData.title
      )}&startdt=${eventData.start.toISOString()}&enddt=${eventData.end.toISOString()}&body=${encodeURIComponent(
        eventData.description
      )}&location=${encodeURIComponent(eventData.location)}`;

      window.open(url, "_blank");
    });

  // iCal download
  document.getElementById("ical-cal").addEventListener("click", function (e) {
    e.preventDefault();

    // Create iCal content
    const icalContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${eventData.title}`,
      `DESCRIPTION:${eventData.description}`,
      `LOCATION:${eventData.location}`,
      `DTSTART:${formatICalDate(eventData.start)}`,
      `DTEND:${formatICalDate(eventData.end)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    // Create download link
    const blob = new Blob([icalContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "AfroVibes-Summit-2026.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Helper function for iCal date format
  function formatICalDate(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  }
});
