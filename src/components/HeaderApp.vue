<template>
  <div>
    <header :class="[getRoute==='buat'?'header2' : 'header1']">
      <nav>
        <h1 :class="[getRoute==='buat'?'h1a' : 'ha2']">BELAJAR<small :class="[getRoute==='buat'?'smalla' : 'smallb']">Web</small></h1>
      <ul>
        <li><router-link to="/" :class="[getRoute==='buat'?'lia' : 'lib']">Beranda</router-link></li>
        <li><router-link to="/buat" :class="[getRoute==='buat'?'lia' : 'lib']">Buat Artikel</router-link></li>
      </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  data() {
    return {
      isBuat: false,
    };
  },
  computed: {
    getRoute() {
      let route = useRoute().name;
      if (route === "buat") {
        console.log("buat");
      }
      return route;
    },
  },
};
</script>

<style scoped>
.header1 {
  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}
.header2 {
  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #0099ff;
  height: 6vh;
}
nav{
  width: 700px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
ul {
  display: flex;
}
.lia {
  margin: 0 1rem;
  font-weight: bold;
  color: white;
  transition: all .3s;
}
.lia:hover{
  color: rgba(255, 255, 255, 0.692);
  transform: scale(1.2, 1.5);
}
.lib {
  margin: 0 1rem;
  font-weight: bold;
  color: rgb(37, 90, 121);
  transition: all .3s;
}
.lib:hover{
  color: rgb(168, 125, 125);
  transform: scale(1.2, 1.5);
}
.ha1{
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
}
.ha2{
  font-weight: bold;
  font-size: 1.2rem;
  color: rgb(37, 90, 121);
}
.smalla{
  color: rgba(255, 255, 255, 0.445);
}
.smallb{
  color: rgba(46, 104, 158, 0.445);
}

@media screen and (max-width : 630px) {
  h1{
    font-size: .9rem;
  }
  li a{
    font-size: .9rem;
  }
}
@media screen and (max-width : 533px) {
  h1{
    font-size: .7rem;
  }
  li a{
    font-size: .7rem;
  }
}
@media screen and (max-width : 330px) {
  ul{
    display: flex;
    flex-direction: column;
    /* background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
    position: absolute;
    width: 100vq;
    height: 100%; */
  }
}
</style>