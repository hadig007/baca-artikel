<template>
  <div>
    <header-app></header-app>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
    <footer-app></footer-app>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import FooterApp from './components/FooterApp.vue';
import HeaderApp from './components/HeaderApp.vue';
export default {
  components: {HeaderApp, FooterApp},
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
  overflow: hidden;
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


::-webkit-scrollbar {
    -webkit-appearance: none;
}

::-webkit-scrollbar:vertical {
    width: 12px;
}

::-webkit-scrollbar:horizontal {
    height: 12px;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .5);
    border-radius: 10px;
    border: 2px solid #ffffff;
}

::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #ffffff;
}

</style>
