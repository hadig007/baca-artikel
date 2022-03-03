<template>
  <div class="bg" @click="hilangkan">
    <transition name="modal1">
      <div class="modal" v-if="showModal == true && selesaiNulis == true " @click="showModal == false">
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
    <transition name="modal1">
      <div class="modal" v-if="showModal == true && tooBig == true" @click="showModal == false">
        <div class="card">
          <div class="text">
            <h2>Ukuran file terlalu besar</h2>
            <h6>Maximal 1MB</h6>
          </div>
          <va-button flat class="mr-4" @click="tooBig=!tooBig">Ulangi</va-button>
        </div>
      </div>
    </transition>

    <div class="judul">
      <h3>Hai, {{ tulisan.penulis }} Selamat menulis😀</h3>
      <p class="tengah">
        Setiap kata dari kalimat yang kamu tulis bisa sangat bermamfaat bagi
        pembaca
      </p>
      <hr />
      <div class="cap">
        <div class="left">
          <p>Judul : {{ tulisan.judul.toUpperCase() }}</p>
          <p>Penulis : {{ tulisan.penulis }}</p>
          <p>Kategori : {{ tulisan.kategori }}</p>
          <p>Waktu : {{ waktu }}</p>
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

    // window.addEventListener('scroll', this.handleScroll);
  },
  onmounted () {
    window.removeEventListener('scroll', this.handleScroll);
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
      tooBig : false,
      selesaiNulis : false,
      scrollPosition : 0,
      customToolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        // [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        // [{ script: "sub" }, { script: "super" }], // superscript/subscript
        // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        // [{ direction: "rtl" }], // text direction

        // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        // [{ font: [] }],
        [{ align: [] }],
        ["image", "link"],

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
  // watch: {
  //   isModalVisible: function() {
  //     if(this.showModal==true){
  //       document.documentElement.style.overflowY = 'hidden'
  //       return
  //     }
  //     document.documentElement.style.overflowY = 'auto'
  //   }
  // },
  methods: {
    // handleScroll(e){
    //   this.scrollPosition =  e.currentTarget.scrollY
    //   console.log(this.scrollPosition)
    // },
    event(e) {
      let fileSize =  e.target.files[0].size
      if(fileSize >= 999999){
        console.log(e.target.files[0].size)
        this.tooBig = true
        this.showModal = true
        return
      }
      else{
        this.photo = e.target.files[0];
        let photos = e.target.files[0];
        this.linkPhoto = URL.createObjectURL(photos);
      }
    },
    kembali() {
      this.$router.push("buat");
    },
    selesai() {
      this.scrollPosition = 0
      setTimeout(()=>{
      this.showModal = !this.showModal;
      this.selesaiNulis = true
      },200)
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
        .post("http://103.176.78.103/api/store_artikel", {
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
            .post(`http://103.176.78.103/api/store_photo/${id}`, formData)
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
  height: 100%;
  position: absolute;
  background-color: #2c3333;
  display: grid;
  place-items: flex-end center;
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
  margin-bottom: 40vh;
}
.card2 {
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  min-width: 30vw;
  margin-bottom: 40vh;
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
  /* min-width: 80vw; */
  justify-content: flex-end;
  height: 5vh;
  max-width: 700px;
  /* background-color: aqua; */
}
hr {
  color: white;
  width: 80vw;
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
  max-width: 700px;
}
.tengah{
  text-align: center;
}
.cap {
  width: 80vw;
  max-width: 700px;
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
  justify-self: end;
  width: 100px;
  color: transparent;
}
img {
  width: 100px;
}
.bg {
  background-color: #2c3333;
  min-height: 94vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  
}
.editor {
  background-color: white;
  box-shadow: 0 0 10px 0.7px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  max-width: 700px;
  width: 80vw;
}
h3 {
  margin: 0;
  color: #ffffff;
  align-self: center;
  text-align: center;
  line-height: 1.2rem;
}
p{
  color: #ffffffa4;
}
.quillWrapper {
  /* width: 80vw; */
  max-width: 700px;
  /* margin: auto; */
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



@media screen and (max-width : 530px) {
  h3,p,p{
    font-size: .8rem;
    line-height: 1rem;
  }
}
</style>