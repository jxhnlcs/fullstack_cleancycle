<template>
  <div class="navbar">
    <nav>
      <router-link class="icon" to="/">
        <i class="fas fa-dashboard"></i>
      </router-link>
      <router-link class="icon" to="/statistics">
        <i class="fas fa-chart-line"></i> 
      </router-link>
    </nav>
  </div>
</template>

<style scoped>

.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

nav {
  padding: 16px;
  border-radius: 85px;
  background-color: #086A35;
}

.icon{
  padding: 5px;

  font-size: 30px;
  margin: 20px;

  color: white;

  transition: 0.5s;
}

.icon:hover{
  color: #086A35;
  background-color: white;

  border-radius: 10px;
}

</style>