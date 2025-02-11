<template>
  <!-- It checks if the user is authenticated (authenticated is true), If authenticated is true, the <Nav> component (navigation bar) will appear. -->
  <Nav v-if="authenticated"/>
  
  <router-view/>
</template>
<script>
// Import the navigation component
import Nav from "@/components/Nav.vue"

export default {
  components: {
    Nav
  },
  data() {
    return {
      // The data function defines a property called authenticated, which starts as false. This means the user is not logged in by default.
      authenticated: false
    };
  },
  watch: {
    // If the route name is not 'login', authenticated becomes true, and the navigation bar is shown.
//If the route name is 'login', authenticated becomes false, and the navigation bar is hidden.
    $route(to) {
      this.authenticated = to.name !== 'login';
    },
  },
  make() {
    // The make method sets the initial value of authenticated when the component is created. It checks the current route's name and sets authenticated based on whether it's 'login' or not.
    this.authenticated = this.$route.name !== 'login';
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color:darkgray;
}
</style>

