<template>
  <div>
    <header-app></header-app>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import HeaderApp from './components/HeaderApp.vue';
export default {
  components: {HeaderApp},
  name: "App",
    
    mounted(){
    if(useRoute().name === 'buat'){
      document.title = "Web Kampus"
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
#app {
  font-family:'Roboto', sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
body {
  margin: 0;
  padding: 0;
  width: 100vw;
}
/* .fade-enter-from{
  opacity: 0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-enter-active{
  transition: .2s all ease-out;
}
.fade-leave-from{
  opacity: 1;
}
.fade-leave-to{
 opacity: 0;
}
.fade-leave-active{
  transition: .2s all ease-in;
} */
</style>
