<template>
  <div class="bg" @click="hilangkan">
    <transition name="modal1">
      <div class="modal" v-if="showModal == true" @click="showModal == false">
        <div class="card">
          <div class="text">
            <h2>Yakin?</h2>
            <h6>Apakah anda yakin untuk menyelesaikan tulisan anda.</h6>
          </div>
          <va-button flat class="mr-4" @click="batal">Batal</va-button>
          <va-button size="medium" class="mr-4" @click="yakin">Yakin</va-button>
        </div>
      </div>
    </transition>

    <div class="judul">
      <h3>Hai, {{ tulisan.penulis }} Selamat menulis😀</h3>
      <p>
        Setiap kata dari kalimat yang kamu tulis bisa sangat bermamfaat bagi
        pembaca
      </p>
      <hr />
      <div class="cap">
        <div class="left">
          <h5>Judul : {{ tulisan.judul.toUpperCase() }}</h5>
          <h5>Penulis : {{ tulisan.penulis }}</h5>
          <h5>Kategori : {{ tulisan.kategori }}</h5>
          <h5>Waktu : {{ waktu }}</h5>
        </div>
        <div class="right">
          <input
            class="inpPhoto"
            type="file"
            @change="event($event)"
            v-if="linkPhoto == null"
            enctype="multipart/form-data"
            accept="image/*"
          />
          <img :src="linkPhoto" alt="" />
        </div>
      </div>
    </div>
    <div class="editor">
      <vue-editor
        class="ed"
        v-model="content"
        :editor-toolbar="customToolbar"
      />
    </div>
    <div class="btn-group">
      <va-button color="warning" gradient class="mr-4" @click="kembali"
        >Kembali</va-button
      >
      <va-button color="info" gradient class="mr-4" @click="selesai"
        >Selesai Menulis</va-button
      >
      <!-- <template>
</template> -->
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue3-editor";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  components: { VueEditor },
  created() {
    this.tulisan = this.$store.state.artikel;
  },
  computed: {
    waktu() {
      let tgl = new Date();
      let wkt = tgl.toDateString();
      return wkt;
    },
  },
  data() {
    return {
      showModal: false,
      message: "Apakah anda telah selesai menulis, tekan ya jika sudah",
      tulisan: {},
      content: "",
      photo: null,
      linkPhoto: null,
      customToolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        // [{ direction: "rtl" }], // text direction

        // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["image"],

        // ["clean"], // remove formatting button
      ],
    };
  },
  mounted() {
    if (useRoute().name === "nulis") {
      document.title = "Web Kampus | Nulis";
    }
    if (this.tulisan.judul === "") {
      this.$router.push("/buat");
    }
  },
  methods: {
    event(e) {
      this.photo = e.target.files[0];
      let photos = e.target.files[0];
      this.linkPhoto = URL.createObjectURL(photos);
    },
    kembali() {
      this.$router.push("buat");
    },
    selesai() {
      this.showModal = !this.showModal;
    },
    batal() {
      this.showModal = false;
    },
    async yakin() {
      console.log(this.photo);
      let formData = new FormData();
      formData.append("photo", this.photo);
      console.log("akan mengirim");
      await axios
        .post("http://127.0.0.1:8000/api/store_artikel", {
          judul: this.tulisan.judul,
          penulis: this.tulisan.penulis,
          kategori: this.tulisan.judul,
          waktu: this.waktu,
          content: this.content,
          photo: formData,
        })
        .then((res) => {
          let formData = new FormData();
          formData.append("photo", this.photo);
          console.log("akan mengirim");
          let id = res.data.data.id;
          axios
            .post(`http://127.0.0.1:8000/api/store_photo/${id}`, formData)
            .then((res) => {
              console.log(res.data);
              let id = res.data.data.id
              this.$router.push(`/artikel/${id}`);
            })
            .catch((err) => {
              console.log(err);
            });
          this.$store.dispatch("getResponse", res.data);
          console.log(res.data);
          console.log("berhasil kirim data");
        })
        .catch((err) => {
          console.log(err);
        });
      this.showModal = false;
    },
  },
};
</script>


<style scoped>
.modal {
  top: 0;
  bottom: 0;
  min-width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #2c3333;
  display: grid;
  place-items: center;
  color: #2c3e50;
  z-index: 10;
}
h6 {
  font-weight: normal;
  margin: 0.5rem;
}
.card {
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  min-width: 30vw;
}
.text {
  text-align: start;
  color: #2c3333;
}
button {
  background-color: #f5f2e7;
  border: none;
  border-radius: 4px;
}
.btn-group {
  margin: 1rem 0;
  display: flex;
  min-width: 80vw;
  justify-content: flex-end;
  height: 5vh;
  /* background-color: aqua; */
}
hr {
  color: white;
  width: 85vw;
  /* max-width: 891px; */
}
.judul {
  margin: 2vh 0;
  min-height: 100px;
  /* border: solid white 1px; */
  width: 80vw;
  text-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* min-width: 891px; */
  justify-content: center;
}
.cap {
  width: 80vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  width: 50%;
  font-size: 0.9rem;
}
.right {
  align-self: center;
}
img {
  width: 100px;
}
.bg {
  background-color: #2c3333;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.editor {
  background-color: white;
  box-shadow: 0 0 10px 0.7px rgba(0, 0, 0, 0.2);
  min-width: 60vw;
}
h3,
p {
  margin: 0;
  color: #f5f2e7;
  align-self: center;
  text-align: center;
}
h5 {
  align-self: flex-start;
  margin: 0;
  color: #f5f2e7;
}
.quillWrapper {
  width: 80vw;
}
.modal1-enter-from {
  transform: translateY(-100vh);
}
.modal1-enter-to {
  transform: translateY(0);
}
.modal1-enter-active {
  transition: all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.modal1-leave-from {
  transform: translateY(0);
}
.modal1-leave-to {
  transform: translateY(100vh);
}
.modal1-leave-active {
  transition: all 0.6s cubic-bezier(1, 0, 0, 1);
}
</style>