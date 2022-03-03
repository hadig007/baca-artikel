<template>
  <div class="container">
    <div class="frame">
      <h1>Hai, Semangat Belajar ❤️</h1>
    </div>
    <div class="konten">
      <div class="box" v-for="(data, index) in artikels" :key="index">
        <router-link :to="{ name: 'artikel', params: { id: data.id } }">
          <img v-bind:src="im + fl[index]" alt="" />
          <h5>HTML #1 : {{ data.judul.toUpperCase() }}</h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
export default {
  async created() {
    await axios
      .get("http://103.176.78.103/api/get_artikel")
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
        this.$store.dispatch("getAllArticle", awalan);

        console.log(this.artikels);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    if (useRoute().name === "beranda") {
      document.title = "Web Kampus | Beranda";
      this.isBuat = true;
    }
  },
  data() {
    return {
      artikels: [],
      fl: [],
      im: "http://103.176.78.103/storage/photo/",
    };
  },
};
</script>
<style scoped>
.container {
  display: block;
  margin: 2rem auto;
  width: 90vw;
  max-width: 700px;
}
.frame {
  height: 20vh;
  border: solid rgb(218, 218, 218) 1px;
  width: 100%;
  margin: 2rem 0;
  background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
  /* background: linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%); */
  /* background: linear-gradient(45deg, #00fbffd0 10%, #ff01ffc7 80%); */
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
.frame :deep(h1) {
  color: white;
  font-size: 2.5rem;
}
.konten {
  /* border: solid rgb(228, 228, 228) 1px; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
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

  @media screen and (max-width: 750px) {
    .container {
      width: 90vw;
    }
    .frame :deep(h1) {
      color: rgb(255, 255, 255);
      font-size: 1.5rem;
    }
    .box{
      width: 27vw;
    }
    img{
      max-width: 27vw;
      max-height: 15vh;
    }
  }


@media screen and (max-width: 630px) {
  .container {
    width: 90vw;
  }
  .frame :deep(h1) {
    color: rgb(255, 255, 255);
    font-size: 1.5rem;
  }
  .box{
    width: 42vw;
  }
  img{
    min-width: 42vw;
  }

@media screen and (max-width: 533px) {
  .container {
    width: 90vw;
  }
  .frame :deep(h1) {
    color: rgb(255, 255, 255);
    font-size: 1.5rem;
  }
  .box{
    width: 40vw;
  }
  img{
    min-width: 40vw;
    max-height: 12vh;
  }
  h5{
    font-size: .7rem;
  }
}
}
@media screen and (max-width: 330px) {
  .container {
    width: 90vw;
  }
  .frame :deep(h1) {
    color: rgb(255, 255, 255);
    font-size: 1.2rem;
  }
  .box{
    width: 38vw;
  }
  img{
    min-width: 38vw;
    max-height: 7vh;
  }
  h5{
    font-size: .4rem;
    margin: .3rem;
  }
}
@media screen and (max-width: 230px) {
  .container {
    width: 90vw;
  }
  .frame :deep(h1) {
    color: rgb(255, 255, 255);
    font-size: 1rem;
  }
  .box{
    width: 90vw;
  }
  img{
    min-width: 90vw;
    max-height: 13vh;
  }
  h5{
    font-size: .8rem;
    margin: .5rem;
  }
}

</style> 
