<template>
  <div class="buat">
    <div class="biru"></div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#0099ff"
        fill-opacity="1"
        d="M0,96L80,128C160,160,320,224,480,218.7C640,213,800,139,960,106.7C1120,75,1280,85,1360,90.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      ></path>
    </svg>
    <div class="box" v-if="isAdmin !== true">
      <h1>WEB KAMPUS</h1>
      <p>Isi data inisial untuk memulai menulis artikel anda</p>
      <hr />
      <input type="text" placeholder="Judul Materi" v-model="judul" />
      <select v-model="penulis">
        <option value="" disabled selected hidden>Penulis</option>
        <option value="Hadi Gunawan">Hadi Gunawan</option>
        <option value="Suci Rahmadani">Suci Ramhadani</option>
      </select>
      <select v-model="kategori">
        <option value="" disabled selected hidden>Kategori</option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JAVASCRIPT">JAVASCRIPT</option>
        <option value="BLOG">BLOG</option>
      </select>
      <button @click="mulai">Mulai Menulis</button>
    </div>

    <div class="box" v-else>
      <h1>Maaf</h1>
      <p>{{ statusText }}</p>
      <input
        v-if="passError === false"
        type="text"
        placeholder="Password admin"
        v-model="PassInput"
        @keypress.enter="cekSandi"
      />
      <button v-if="passError === false" @click="cekSandi">Selesai</button>
      <h6 v-if="passError === true">
        mengarahkan ke beranda...({{ counter }}s)
      </h6>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  data() {
    return {
      judul: "",
      penulis: "",
      photo: "",
      kategori: "",
      isAdmin: true,
      passAdmin: "1234321",
      PassInput: "",
      statusText:
        "Menulis artikel masih tersedia hanya untuk admin, mohon verifikasi bahwa anda adalah admin.",
      passError: false,
      counter: 1,
    };
  },
  mounted() {
    if (useRoute().name === "buat") {
      document.title = "Web Kampus";
      this.isBuat = true;
    }
  },
  methods: {
    mulai() {
      if (this.judul === "" || this.penulis === "" || this.kategori === "") {
        return alert("lengkapi data dulu bro");
      }
      console.log(this.judul);
      console.log(this.penulis);
      this.$store.dispatch("getArticle", {
        judul: this.judul,
        penulis: this.penulis,
        kategori: this.kategori,
      });
      this.$router.push("/nulis");
    },
    cekSandi() {
      if (this.PassInput == this.passAdmin) {
        this.isAdmin = false;
      } else {
        this.statusText = "Maaf Password yang anda masukkan salah!";
        this.passError = true;
        setTimeout(() => {
          this.counter--;
          this.$router.push("/beranda");
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.buat {
  max-width: 100vw;
}
.biru {
  height: 30vh;
  background-color: #0099ff;
}
.box {
  box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.08);
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #395b64;
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 350px;
  max-height: 350px;
  margin: auto auto;
  justify-content: center;
}
input,
select,
button {
  margin: 10px;
  padding: 10px;
  font-size: 1.1rem;
  border-radius: 4px;
  font-size: 1.1rem;
  border: none;
}
button {
  background-color: #2c3333;
  color: #f5f2e7;
}
h1 {
  text-align: start;
  color: #f5f2e7;
  text-align: center;
  font-size: 2rem;
}
img {
  width: 34vw;
  /* height: 150px; */
  align-self: center;
  border-radius: 4px;
}
hr {
  width: 300px;
}
p {
  font-size: 0.9rem;
  color: #fffdf7ce;
}
h6 {
  color: #fffdf7ce;
  font-weight: normal;
  font-size: 0.9rem;
}
@media screen and (max-width: 530px) {
  .box {
    transform: scale(.8);
  }
}
</style>