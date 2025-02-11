<template>
    <div>
        
        <Employeelist/>
    </div>
</template>
<script>
import Employeelist from '@/components/Employeelist.vue';

export default {
    components:{
        Employeelist
    }
}
</script>
<style scoped>
/* Basic styles for the nav bar */
.sidebar {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Header with title and menu icon */
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Menu icon */
.menu-icon {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
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
  max-height: 200px; /* Adjust based on content */
}

/* Links styling */
.nav-links a {
  text-decoration: none;
  color: white;
  background-color: #3498db;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Hover effect for links */
.nav-links a:hover {
  background-color: #2980b9;
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
 /* Make the table responsive */
 table {
    width: 100%;
    border-collapse: collapse;
  }

  /* Adjust table layout for smaller screens */
  @media only screen and (max-width: 768px) {
    table {
      font-size: 14px;
    }
    th, td {
      padding: 10px;
    }
  }

  /* Hide certain columns on smaller screens */
  @media only screen and (max-width: 768px) {
    table td:nth-child(5), table td:nth-child(6) {
      display: none;
    }
  }

  /* Use a vertical layout for the table on very small screens */
  @media only screen and (max-width: 480px) {
    table {
      display: block;
    }
    table tr {
      display: block;
      margin-bottom: 20px;
    }
    table td {
      display: block;
      padding: 10px;
      border: none;
    }
  }

  /* Adjust the modal layout for smaller screens */
  @media only screen and (max-width: 768px) {
    .modal-content {
      width: 90%;
      padding: 20px;
    }
  }
</style>