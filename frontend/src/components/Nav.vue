<template>
  <!-- This div contains 'menu-icon' and link routes-->
  <div>
    
    <nav class="sidebar">
      <div class="nav-header">
        <span class="nav-title"></span>
        <!--This is menu icon for styling. It also has "open" that is toggled based on the 'isMenuOpen' data property. When clicked, it calls the 'toggleMenu' method-->
        <div class="menu-icon" :class="{open: isMenuOpen}" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    
      <!--This is a'nav-link' container, it contains the link to different routes, it has dynamic class 'show' that is toggled based on the 'isMenuOpen' data property-->
      <div class="nav-links" :class="{ 'show': isMenuOpen }">
        <router-link to="/employee">Employees</router-link>
        <router-link to="/payroll">Payroll</router-link>
        <router-link to="/performancereview">Performance Reviews</router-link>
        <router-link to="/Timeoff">Time off and Attendance</router-link>
        <router-link to="/">Log out</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false, // Tracks whether the menu-bar/humburger is open
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Toggle menu visibility
    },
  },
};
</script>

<style scoped>
/* Basic styles for the nav bar */
.sidebar {
  background-color: lightslategray;
  color: black;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 100%;
}

/* Header with title and menu icon */
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Menu icon */
.menu-icon {
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

}

.menu-icon span {
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-icon span:nth-child(1) {
  top: 10px;
}

.menu-icon span:nth-child(2) {
  top: 18px;
}

.menu-icon span:nth-child(3) {
  top: 26px;
}

/* Rotate lines when open */
.menu-icon.open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-icon.open span:nth-child(2) {
  opacity: 0;
}

.menu-icon.open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Links container */
.nav-links {
  display: flex;
  flex-direction: column; /* Default is stacked links */
  gap: 1rem;
  margin-top: 1rem;
  overflow: hidden;
  max-height: 0; /* Initially hidden */
  transition: max-height 0.3s ease;
}

/* Show links when menu is open */
.nav-links.show {
  max-height: 1000px; /* Adjust based on content */
}

/* Links styling */
.nav-links a {
  text-decoration: none;
  color: black;
  background-color: lightgrey;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Hover effect for links */
.nav-links a:hover {
  background-color: grey;
  transform: scale(1.05);
}



/* Media queries for larger screens */
@media (min-width: 768px) {
  .menu-icon {
    display: none; /* Hide menu icon on larger screens */
  }

  .nav-links {
    display: flex;
    flex-direction: row; /* Horizontal links on larger screens */
    gap: 1rem;
    max-height: none; /* No height restriction */
    margin-top: 0;
  }
}
</style>
