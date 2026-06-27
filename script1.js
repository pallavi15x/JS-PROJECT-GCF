// DOM Element Registries
const loginForm = document.getElementById("login-form");
const loginContainer = document.getElementById("login-container");
const mainPortal = document.getElementById("main-portal");
const themeToggle = document.getElementById("theme-toggle");
const logoutBtn = document.getElementById("logout-btn");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".portal-section");
const currentViewTitle = document.getElementById("current-view-title");

// PERSISTENCE CHECK ON PAGE LOAD
// This immediately runs when the page refreshes to see if a session exists
const savedEmail = localStorage.getItem("userEmail");
if (savedEmail) {
  loginContainer.classList.add("hidden");
  mainPortal.classList.remove("hidden");
  document.getElementById("user-display-name").innerText = savedEmail
    .split("@")[0]
    .toUpperCase();
}

// 8. LOGIN SUBMISSION SIMULATION
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  // Simple verification check to mock college email validation setup
  if (email.endsWith(".edu") || email.includes("@")) {
    // Save the email to localStorage so it persists across refreshes
    localStorage.setItem("userEmail", email);

    loginContainer.classList.add("hidden");
    mainPortal.classList.remove("hidden");
    document.getElementById("user-display-name").innerText = email
      .split("@")[0]
      .toUpperCase();
  } else {
    alert("Please use your valid authorized institutional email id.");
  }
});

// LOGOUT SYSTEM PROCEDURES
logoutBtn.addEventListener("click", () => {
  // Clear the saved session data so they stay logged out
  localStorage.removeItem("userEmail");

  mainPortal.classList.add("hidden");
  loginContainer.classList.remove("hidden");
  loginForm.reset();
});

// SINGLE PAGE APPLICATION (SPA) NAVIGATION SYSTEM
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active flags across links
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Route sections display mappings
    const targetSectionId = link.getAttribute("data-target");
    sections.forEach((section) => {
      section.classList.remove("active-section");
      if (section.id === targetSectionId) {
        section.classList.add("active-section");
      }
    });

    // Set dynamic title text at Header Top Bar
    currentViewTitle.innerText = link.innerText.trim();
  });
});

// 3. DARK MODE ENGINE ARCHITECTURE
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const targetTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", targetTheme);

  // Update structural FontAwesome icon indicator visually
  const icon = themeToggle.querySelector("i");
  if (targetTheme === "dark") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
});

// 10. DYNAMIC DEPARTMENT DIRECTORY SWITCHER
const deptTabBtns = document.querySelectorAll(".dept-tab-btn");
const deptViews = document.querySelectorAll(".dept-content");

deptTabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 1. Manage Active Button Styles
    deptTabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // 2. Determine target department view
    const targetDeptId = btn.getAttribute("data-dept") + "-dept";

    // 3. Switch active department views
    deptViews.forEach((view) => {
      view.classList.remove("active-dept");
      view.classList.add("hide"); // Hide everything securely

      if (view.id === targetDeptId) {
        view.classList.remove("hide");
        view.classList.add("active-dept");

        // 4. Trigger clean entrance animation
        view.classList.remove("animate-entrance");
        void view.offsetWidth; // Reflow
        view.classList.add("animate-entrance");
      }
    });
  });
});

// 9. DYNAMIC DOUBT SECTION POST FORUM (WITH FILE UPLOAD)
const doubtForm = document.getElementById("doubt-form");
const forumThreads = document.getElementById("forum-threads");

if (doubtForm) {
  doubtForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = document.getElementById("doubt-subject").value;
    const detail = document.getElementById("doubt-text").value;
    const fileInput = document.getElementById("doubt-file");

    // Check if a file was uploaded and grab its name
    let attachmentHTML = "";
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      attachmentHTML = `
        <a href="#" class="attachment-link file-link" style="margin-bottom: 1rem; display: inline-flex;">
          <i class="fa-solid fa-paperclip"></i> ${fileName}
        </a>
      `;
    }

    // Structure new dynamic element component
    const newPost = document.createElement("div");
    newPost.className = "forum-post animate-entrance";
    newPost.innerHTML = `
          <h4><strong>Q: ${subject}</strong></h4>
          <p class="posted-by">Posted by: You | Just Now</p>
          <p style="font-size:0.95rem; margin-bottom:0.5rem;">${detail}</p>
          ${attachmentHTML}
          <p class="reply-box" style="color: var(--text-muted); font-style: italic;">
              <i class="fa-solid fa-clock"></i> Awaiting peer or department faculty review...
          </p>
      `;

    forumThreads.prepend(newPost);
    doubtForm.reset();
    alert(
      "Your community doubt question has been posted to the forum successfully!",
    );
  });
}

// 4. GRIEVANCE CELL COMPLAINT REGISTRY PROCESSING
const grievanceForm = document.getElementById("grievance-form");
grievanceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cat = document.getElementById("grievance-cat").value;
  const trackingTicket = Math.floor(100000 + Math.random() * 900000);

  alert(
    `Grievance Documented Under Category: ${cat}\n\nYour complaint tracker ticket number is: #CMS-${trackingTicket}. The academic compliance cell will audit this immediately.`,
  );
  grievanceForm.reset();
});
// ══════════════════════════════════════════
// NEW: ANNOUNCEMENTS SECTION (day-to-day
// classroom & department updates)
// ══════════════════════════════════════════

// 11. ANNOUNCEMENT CATEGORY FILTER SWITCHER
function filterAnnouncements(category, evt) {
  // Toggle active state across filter buttons
  document
    .querySelectorAll(".ann-filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add("active");
  }

  // Show/hide announcement cards based on selected category
  const items = document.querySelectorAll(
    "#announcement-feed .announcement-item",
  );
  items.forEach((item) => {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}
// 11. DYNAMIC NOTICE BOARD FILTERS & ANIMATIONS
const filterBtns = document.querySelectorAll(".filter-btn");
const noticeItems = document.querySelectorAll(".notice-item");

// Handle Filtering Logic
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 1. Update active styling on buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    // 2. Filter the notices
    noticeItems.forEach((item) => {
      // Clear previous entrance animations
      item.classList.remove("animate-entrance");
      item.style.animationDelay = "0s";

      if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
      ) {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });
  });
});

// Trigger Staggered Entrance Animations when Navigating to Notices
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.getAttribute("data-target") === "notices") {
      // Select only currently visible notices based on active filter
      const visibleNotices = Array.from(noticeItems).filter(
        (item) => !item.classList.contains("hide"),
      );

      visibleNotices.forEach((item, index) => {
        item.classList.remove("animate-entrance");

        // Trigger a DOM reflow to restart the animation cleanly
        void item.offsetWidth;

        // Stagger the delay: 0s, 0.1s, 0.2s...
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add("animate-entrance");
      });
    }
  });
});
// 12. NOTICE BOARD ATTACHMENT ACCORDION LOGIC
const attachmentToggles = document.querySelectorAll(".attachment-toggle-btn");

attachmentToggles.forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    // Prevent the notice-item hover effect from feeling jumpy
    e.stopPropagation();

    // Toggle the active class on the button (for the chevron rotation)
    this.classList.toggle("expanded");

    // Find the immediate next sibling which is the dropdown container
    const dropdown = this.nextElementSibling;

    if (dropdown.classList.contains("open")) {
      dropdown.classList.remove("open");
    } else {
      // Optional: Close other open dropdowns first (Accordion behavior)
      // Remove the 3 lines below if you want multiple dropdowns open at once
      document
        .querySelectorAll(".attachment-dropdown")
        .forEach((drop) => drop.classList.remove("open"));
      document
        .querySelectorAll(".attachment-toggle-btn")
        .forEach((btn) => btn.classList.remove("expanded"));

      // Open the clicked one
      this.classList.add("expanded");
      dropdown.classList.add("open");
    }
  });
});
// 13. ASSIGNMENT TAB SWITCHER & ANIMATION CONTROLLER
const assignTabBtns = document.querySelectorAll(".assign-tab-btn");
const assignViews = document.querySelectorAll(".assignment-view");

assignTabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // 1. Update tab active states
    assignTabBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // 2. Determine target view
    const targetViewId = btn.getAttribute("data-tab") + "-assignments";

    // 3. Switch views
    assignViews.forEach((view) => {
      view.classList.remove("active-view");

      if (view.id === targetViewId) {
        view.classList.add("active-view");

        // 4. Re-trigger entrance animations for cards inside the active view
        const cards = view.querySelectorAll(".assignment-card");
        cards.forEach((card, index) => {
          card.classList.remove("animate-entrance");
          void card.offsetWidth; // Trigger DOM reflow to restart animation
          card.style.animationDelay = `${index * 0.1}s`;
          card.classList.add("animate-entrance");
        });
      }
    });
  });
});
function toggleAttendanceDetails() {
  const details = document.getElementById("attendance-details");

  details.classList.toggle("show");
}

function toggleSemester(id) {
  const semester = document.getElementById(id);

  semester.classList.toggle("show");
}
function filterTimetable() {
  const input = document.getElementById("subject-filter").value.toLowerCase();
  const table = document.getElementById("timetable-table");
  const tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
    const rowText = tr[i].innerText.toLowerCase();
    tr[i].style.display =
      rowText.includes(input) || tr[i].classList.contains("recess-row")
        ? ""
        : "none";
  }
}
// shivam

const attendanceCard = document.getElementById("attendance-card");

attendanceCard.addEventListener("click", function () {
  // Sab sections hide karo
  document.querySelectorAll(".portal-section").forEach((section) => {
    section.classList.remove("active-section");
  });

  // Attendance section show karo
  document.getElementById("attendance").classList.add("active-section");

  // Sidebar active link update karo
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  document
    .querySelector('.nav-link[data-target="attendance"]')
    .classList.add("active");

  // Page title change karo
  document.getElementById("current-view-title").textContent = "Attendance";

  // Attendance section par scroll
  document.getElementById("attendance").scrollIntoView({
    behavior: "smooth",
  });
});

// notice click

const noticesCard = document.getElementById("notices-card");

noticesCard.addEventListener("click", function () {
  // Sab sections hide karo
  document.querySelectorAll(".portal-section").forEach((section) => {
    section.classList.remove("active-section");
  });

  // Notice section show karo
  document.getElementById("notices").classList.add("active-section");

  // Sidebar active link update karo
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
});
const assignmentsCard = document.getElementById("assignments-card");

assignmentsCard.addEventListener("click", function () {
  // Sab sections hide karo
  document.querySelectorAll(".portal-section").forEach((section) => {
    section.classList.remove("active-section");
  });

  // Assignments section show karo
  document.getElementById("assignments").classList.add("active-section");

  // Sidebar active link update karo
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  document
    .querySelector('.nav-link[data-target="assignments"]')
    .classList.add("active");

  // Page title change karo
  document.getElementById("current-view-title").textContent = "Assignments";

  // Assignments section par scroll
  document.getElementById("assignments").scrollIntoView({
    behavior: "smooth",
  });
});
// ==========================================================================
// CAMPUS HIGHLIGHTS CAROUSEL INTERACTIVITY LOGIC
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("carouselPrevBtn");
  const nextBtn = document.getElementById("carouselNextBtn");
  const indicatorsContainer = document.getElementById("carouselIndicators");

  if (!track || !prevBtn || !nextBtn || !indicatorsContainer) return;

  const slides = Array.from(track.children);
  const dots = Array.from(indicatorsContainer.children);
  let currentIndex = 0;
  let autoPlayTimer = null;

  function updateCarousel(index) {
    // Loop boundary control
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Slide track translation
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Manage slide component visibility triggers
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });

    // Update indicator pills
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function nextSlide() {
    updateCarousel(currentIndex + 1);
  }

  function prevSlide() {
    updateCarousel(currentIndex - 1);
  }

  // Click triggers for navigation buttons
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoPlay();
  });

  // Click triggers for micro indicators
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateCarousel(index);
      resetAutoPlay();
    });
  });

  // Engine automatic rotation logic
  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 5000); // Transitions slide every 5 seconds
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  // UX safety mechanism: Pause sliding sequence when user hovers over the element
  const carouselContainer = document.querySelector(".carousel-container");
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", () =>
      clearInterval(autoPlayTimer),
    );
    carouselContainer.addEventListener("mouseleave", startAutoPlay);
  }

  // Initialize the carousel timeline engine
  startAutoPlay();
});
// ═════════════════════════════════════════════════════════════
// NEW: MOBILE SIDEBAR TOGGLE & NOTIFICATION ENGINE MODIFICATIONS
// ═════════════════════════════════════════════════════════════

const mobileSidebarToggle = document.getElementById("sidebar-toggle");
const sideNavElement = document.querySelector(".sidebar");
const notificationToggleBtn = document.getElementById("notification-btn");
const notificationMenuDropdown = document.getElementById(
  "notification-dropdown",
);

// A. Mobile Hamburger Sidebar Slidout Controls
if (mobileSidebarToggle && sideNavElement) {
  mobileSidebarToggle.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevents instant event bubble closures
    sideNavElement.classList.toggle("open");
  });
}

// B. Automatically close mobile drawer menu when link routing changes
const menuRouteLinks = document.querySelectorAll(".nav-link");
menuRouteLinks.forEach((linkItem) => {
  linkItem.addEventListener("click", () => {
    if (window.innerWidth <= 992 && sideNavElement) {
      sideNavElement.classList.remove("open");
    }
  });
});

// C. Notification Floating Dropdown Toggle Handler Logic
if (notificationToggleBtn && notificationMenuDropdown) {
  notificationToggleBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    notificationMenuDropdown.classList.toggle("hidden");
  });
}

// D. Global Document Monitor Click Watcher (Graceful Blur Dismissals)
document.addEventListener("click", (event) => {
  // Dismiss notification popup panels if users click outside the boundaries
  if (
    notificationMenuDropdown &&
    !notificationMenuDropdown.contains(event.target) &&
    event.target !== notificationToggleBtn &&
    !notificationToggleBtn.contains(event.target)
  ) {
    notificationMenuDropdown.classList.add("hidden");
  }

  // Dismiss responsive navigation drawers if clicked outside area parameters
  if (
    sideNavElement &&
    !sideNavElement.contains(event.target) &&
    event.target !== mobileSidebarToggle &&
    !mobileSidebarToggle.contains(event.target)
  ) {
    if (window.innerWidth <= 992) {
      sideNavElement.classList.remove("open");
    }
  }
});
// ==========================================================================
// STUDENT PROFILE OPTIONS & ADMIT CARD DOWNLOAD ENGINE
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const infoModalOverlay = document.getElementById("student-info-modal");
  const modalTitleElement = document.getElementById("modal-title-text");
  const modalDynamicBody = document.getElementById("modal-dynamic-body");
  const closeModalBtn = document.getElementById("close-modal-btn");

  const openProfileInfoBtn = document.getElementById("open-profile-info-btn");
  const openExamDetailsBtn = document.getElementById("open-exam-details-btn");

  if (!infoModalOverlay || !modalDynamicBody || !closeModalBtn) return;

  // Mock Student Record Data Array Object Matrix Variables
  const studentDataRegistry = {
    department: "Computer Science & Engineering",
    course: "B.Tech (Data Science specialization)",
    enrollmentNo: "PU-2026-CSE-8841",
    feesStatus: "Pending", // Toggles between "Paid" or "Pending" layouts
    feesAmount: "₹85,000",
    examCycle: "End Semester Exams (Summer 2026)",
    examSchedule: "July 15, 2026 – July 30, 2026",
    seatingBlock: "Lab Block-3, Room 402",
  };

  // Action Menu 1 Click Callback: Profile Information Sheet Generator
  openProfileInfoBtn.addEventListener("click", () => {
    modalTitleElement.innerHTML =
      '<i class="fa-solid fa-id-card"></i> Student Profile Info';

    let billingStatusBadge =
      studentDataRegistry.feesStatus === "Paid"
        ? `<span class="fee-badge-paid"><i class="fa-solid fa-circle-check"></i> Fully Cleared</span>`
        : `<span class="fee-badge-pending"><i class="fa-solid fa-circle-exclamation"></i> ${studentDataRegistry.feesAmount} Outstanding</span>`;

    let actionPaymentFooterBtn =
      studentDataRegistry.feesStatus === "Pending"
        ? `<button class="modal-action-btn btn-pay" onclick="alert('Routing secure payment terminal interface window gateway integration...')"><i class="fa-solid fa-credit-card"></i> Clear Outstanding Balance Now</button>`
        : "";

    modalDynamicBody.innerHTML = `
      <div class="info-detail-row"><span class="info-label">Department</span><span class="info-value">${studentDataRegistry.department}</span></div>
      <div class="info-detail-row"><span class="info-label">Degree Course</span><span class="info-value">${studentDataRegistry.course}</span></div>
      <div class="info-detail-row"><span class="info-label">Enrollment No.</span><span class="info-value">${studentDataRegistry.enrollmentNo}</span></div>
      <div class="info-detail-row"><span class="info-label">Financial Account</span><span class="info-value">${billingStatusBadge}</span></div>
      ${actionPaymentFooterBtn}
    `;

    infoModalOverlay.classList.remove("hidden");
  });

  // Action Menu 2 Click Callback: Examination Details & Download Processing Trigger
  openExamDetailsBtn.addEventListener("click", () => {
    modalTitleElement.innerHTML =
      '<i class="fa-solid fa-file-invoice"></i> Examination Control Hub';

    modalDynamicBody.innerHTML = `
      <div class="info-detail-row"><span class="info-label">Current Cycle</span><span class="info-value">${studentDataRegistry.examCycle}</span></div>
      <div class="info-detail-row"><span class="info-label">Timeline Range</span><span class="info-value">${studentDataRegistry.examSchedule}</span></div>
      <div class="info-detail-row"><span class="info-label">Assigned Hall</span><span class="info-value">${studentDataRegistry.seatingBlock}</span></div>
      <button class="modal-action-btn btn-download" id="download-admit-card-action">
        <i class="fa-solid fa-cloud-arrow-down"></i> Download Verification Admit Card (PDF)
      </button>
    `;

    infoModalOverlay.classList.remove("hidden");

    // Dynamic execution hook for local temporary blob downloadable assembly
    document
      .getElementById("download-admit-card-action")
      .addEventListener("click", () => {
        executeAdmitCardDownloadStream();
      });
  });

  // Client Blob Compilation Engine Module Function for Document Exporting Simulations
  function executeAdmitCardDownloadStream() {
    const virtualDocContent =
      `=======================================================\n` +
      `           PARUL UNIVERSITY ADMIT CARD RECEIPT        \n` +
      `=======================================================\n` +
      `ENROLLMENT NO : ${studentDataRegistry.enrollmentNo}\n` +
      `STUDENT NAME  : ALEX MERCER\n` +
      `DEPARTMENT    : ${studentDataRegistry.department}\n` +
      `COURSE RUN    : ${studentDataRegistry.course}\n` +
      `EXAM TIMELINE : ${studentDataRegistry.examSchedule}\n` +
      `SEATING ARENA : ${studentDataRegistry.seatingBlock}\n` +
      `STATUS FLAG   : SYSTEM VERIFIED / CLEARANCE GRANTED\n` +
      `=======================================================\n` +
      `Generated securely via SmartCampus Portal on June 2026.`;

    const blobFileStream = new Blob([virtualDocContent], {
      type: "text/plain;charset=utf-8",
    });
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = URL.createObjectURL(blobFileStream);
    downloadAnchor.download = `AdmitCard_${studentDataRegistry.enrollmentNo}.txt`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  }

  // Dismissal Closures Hooks Handlers
  closeModalBtn.addEventListener("click", () =>
    infoModalOverlay.classList.add("hidden"),
  );

  infoModalOverlay.addEventListener("click", (event) => {
    if (event.target === infoModalOverlay) {
      infoModalOverlay.classList.add("hidden");
    }
  });
});
