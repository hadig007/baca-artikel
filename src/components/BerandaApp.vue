<template>
  <div class="container">
    <div class="frame">
      <h1>Hai, Semangat Belajar ❤️</h1>
    </div>
    <div class="konten">
      <div class="box" v-for="(data, index) in artikels" :key="index">
        <router-link :to="{ name: 'artikel', params: { id: data.id }}">
          <img v-bind:src="im + fl[index]" alt="" />
          <h5>HTML #1 : {{ data.judul.toUpperCase() }}</h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {useRoute} from 'vue-router'
export default {
  async created() {
    await axios
      .get("http://127.0.0.1:8000/api/get_artikel")
      .then((res) => {
        console.log("berhasil ambil data");
        let awalan = res.data.data;
        awalan.map((data) => {
          let a = data.photo.split("/"); // ['photo', abcxxxxxx.jpg]
          let a1 = a.slice(2, 3);
          let a2 = a1.join("/");
          let a3 = a2;
          this.fl.push(a3);
          res.data.data.photo = a3;
        });
        this.artikels = awalan;
        this.$store.dispatch('getAllArticle', awalan)
        
        console.log(this.artikels);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted(){
     if (useRoute().name === "beranda") {
      document.title = "Web Kampus | Beranda";
      this.isBuat = true;
    }
  },
  data() {
    return {
      artikels: [],
      fl: [],
      im: "http://localhost:8000/storage/photo/",
    };
  },
};
</script>
<style scoped>
.container {
  display: block;
  margin: 2rem auto;
  width: 700px;
}
.frame {
  height: 20vh;
  border: solid rgb(218, 218, 218) 1px;
  width: 100%;
  margin: 2rem 0;
  background: linear-gradient(90deg, #fdbb2d 0%, #22c1c3 100%);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation-name: frame;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-direction: alternate;
}
.frame >>> h1 {
  color: white;
  font-size: 2.5rem;
}
.konten {
  /* border: solid rgb(228, 228, 228) 1px; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.box {
  width: 216.6px;
  /* height: 150px; */
  margin: 0.5rem;
  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  transition: 0.3s all cubic-bezier(0.075, 0.82, 0.165, 1);
  /* padding: 1rem; */
}
.box:hover {
  box-shadow: 1px 1px 4px 0.5px rgba(0, 0, 0, 0.04);
}
img {
  width: 216px;
  height: 120px;
  background-size: contain;
  border-radius: 4px 4px 0 0;
}
h5 {
  text-align: start;
  font-size: 0.88rem;
  margin: 0.5rem;
}
</style>
