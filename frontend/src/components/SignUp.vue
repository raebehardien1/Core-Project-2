<template>
  
  <div class="login-container">
  
    <img class="logo" src="/assets/newlogo.png">
    <!-- Form submission handler-->
    <form @submit.prevent="handleSubmit" class="logi-form">
      <div>
        <!-- Username field with v-model binding to formData.userName -->
        <label>Username:</label>
        <input type="text" v-model="formData.userName"  required/>
      </div>
      <div>
        <!-- Password field with v-model binding to formData.password -->
        <label>Password:</label>
        <input type="password" v-model="formData.password"  required/>
      </div>
      <!-- Dropdown for department selection, bound to formData.Department -->
      <label>Department:</label>
      <select v-model="formData.Department">
        <option value="Marketing">Marketing</option>
        <option value="Support">Support</option>
        <option value="Finance">Finance</option>
        <option value="QA">QA</option>
        <option value="Design">Design</option>
        <option value="IT">IT</option>
        <option value="sales">Sales</option>
        <option value="HR">HR</option>
        <option value="Development">Development</option>
      </select><br><br>
      <!-- Submit button for the form -->
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<script>
export default {
  data(){
    return{
      users:[
        {userName:"Fatima_Patel",password:"password10",Department:"Support"},
        {userName:"Sibongile_Nkosi",password:"password01",Department:"Development"},
        {userName:"Lungile_Moyo",password:"password02",Department:"HR"},
        {userName:"Thabo_Molefe",password:"password03",Department:"QA"},
        {userName:"Keshav_Naidoo",password:"password04",Department:"Sales"},
        {userName:"Zanele_Khumalo",password:"password05",Department:"Marketing"},
        {userName:"Sipho_Zulu",password:"password06",Department:"Design"},
        {userName:"Naledi_Moeketsi",password:"password07",Department:"IT"},
        {userName:"Farai_Gumbo",password:"password08",Department:"Marketing"},
        {userName:"Karabo_Dlamini",password:"password09",Department:"Finance"},
        {userName:"admin",password:"admin",Department:"Finance"},
      ],
    formData:{
      userName: '',
      password: '',
      Department: ''
    }
  };
  },
  methods: {
    handleSubmit() {
      const userName = this.formData.userName.trim();
      const password = this.formData.password.trim();
      const Department = this.formData.Department.trim();
//function
      // this matches users details from the data array
      const user = this.users.find(user => user.userName === userName && user.password === password && user.Department === Department);
      if(user){
       alert(`Welcome ${user.userName} you are logged in as part of the ${user.Department} Department.`)
        this.$router.push({name: 'employee'})
      }else{
        alert('Invalid username or password');
      }
  }
}
}
</script>
<style scoped>
/* .logo{
  border:1px solid lightgrey;
} */
.login-container {
  display: flex;
  background-image: url(https://plus.unsplash.com/premium_photo-1672770392853-62eb28bad482?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg1fHxociUyMHN5c3RlbSUyMHdlYnNpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww);
  background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment:fixed;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  width: 100vw;
  height: 100vh;
  margin: 0;
}
.logo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
}
.login-form {
  padding: 20px;
  margin: 30px auto;
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
button {
  width: 150px;
  background: lightgray;
  color: black;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
}
label {
  color: white;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  max-width: 350px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  border: 2px solid grey;
  border-radius: 8px;
}
/* reponsiveness */
@media only screen and (max-width: 480px) {
  .login-form {
    padding: 10px;
  }
  input,
  select {
    padding: 5px;
  }
}
</style>
