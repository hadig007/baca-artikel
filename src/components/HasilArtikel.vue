<template>
  <div class="container" v-if="loading === false">
    <div class="head">
      <h1 class="head judul">{{ toRender.judul.toUpperCase() }}</h1>
      <h2 class="head penulis">{{ toRender.penulis }}</h2>
      <p class="head waktu">{{ toRender.waktu }}</p>
    </div>
    <img :src="link + img" alt="" />
    <div class="ctn" v-html="toRender.content"></div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  async created() {
    this.all = this.$store.state.allArticle;
    console.log("parameter + " + this.$route.params.id);
    let id = this.$route.params.id;
    await axios
      .get(`http://127.0.0.1:8000/api/get_artikel_byId/${id}`)
      .then((res) => {
        this.toRender = res.data.data;
        let data = res.data.data;
        let a = data.photo
        let b = a.split('/')[2]
        this.img = b
        console.log(this.img)
        this.toRender = data;
        this.loading = false;
      });
  },
  data() {
    return {
      toRender: null,
      link: "http://localhost:8000/storage/photo/",
      img : '',
      loading: true,
    };
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
}
.head {
  width: 700px;
  /* border: solid 1px grey; */
  display: flex;
  flex-direction: column;
}
.judul,
.penulis,
.waktu {
  /* line-height: 1.5rem; */
  align-self: flex-start;
  font-size: 1.4rem;
  text-align: start;
}
.penulis {
  font-size: 0.9rem;
  font-weight: normal;
}
.waktu {
  color: grey;
  font-size: 0.7rem;
}
.ctn {
  margin-top: 0.5rem;
  width: 700px;
  /* border: solid 1px grey; */
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.ctn >>> p {
  line-height: 1.5rem;
  text-align: start;
  line-height: 1.5rem;
}
.ctn >>> h1,
.ctn >>> h2,
.ctn >>> h3,
.ctn >>> h4,
.ctn >>> h5,
.ctn >>> h6 {
  line-height: 1.5rem;
  text-align: start;
  line-height: 1.5rem;
}
.ctn >>> img {
  max-width: 700px;
}
img {
  opacity: 1;
  width: 700px;
}
</style>