<template>
  <div class="container" v-if="loading === false">
    <img :src="link + img" alt="" />
    <div class="head">
      <h1 class="head judul">{{ toRender.judul.toUpperCase() }}</h1>
      <h2 class="head penulis">{{ toRender.penulis }}</h2>
      <p class="head waktu">{{ toRender.waktu }}</p>
    </div>
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
      .get(`http://103.176.78.103/api/get_artikel_byId/${id}`)
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
      link: "http://103.176.78.103/storage/photo/",
      img : '',
      loading: true,
    };
  },
};
</script>

<style scoped>
.container {
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem auto;
}
.head {
  width: 90vw;
  /* border: solid 1px grey; */
  display: flex;
  flex-direction: column;
}
.judul,
.penulis,
.waktu {
  width: 90vw;
  /* line-height: 1.5rem; */
  align-self: flex-start;
  font-size: 1.1rem;
  text-align: start;
  line-height: 1rem;
}
.judul{
  line-height: 2.2rem;
  font-size: 1.8rem;
  font-size: bold;
  margin: .5rem 0;
}
.penulis {
  font-size: 0.9rem;
  font-weight: normal;
  color: rgb(100, 100, 100);
}
.waktu {
  color: rgb(160, 160, 160);
  font-size: 0.7rem;
}
.ctn {
  margin-top: 0.5rem;
  width: 100%;
  /* border: solid 1px grey; */
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
/* :deep(.b)  */
.ctn :deep(p) {
  line-height: 1.8rem;
  text-align: start;
  font-size: 1.2rem;
}
.ctn :deep(h1),
.ctn :deep(h2),
.ctn :deep(h3),
.ctn :deep(h4),
.ctn :deep(h5),
.ctn :deep(h6) {
  line-height: 1.5rem;
  text-align: start;
  line-height: 1.5rem;
}
.ctn :deep(img) {
  max-width: 700px;
}
img {
  width: 100vw;
  margin: 0 0 0 0;
}
@media screen and (max-width : 533px) {
.judul,
.penulis,
.waktu {
  font-size: 1.2rem;
}
.judul{
  line-height: 1.5em;
  font-size: bold;
  margin: 1rem 0;
}
.penulis {
  font-size: 0.8rem;
}
.waktu {
  color: rgb(160, 160, 160);
  font-size: 0.6rem;
}
/* :deep(.b)  */
.ctn :deep(p) {
  line-height: 1.8rem;
  text-align: start;
  font-size: 1rem;
}
}
</style>