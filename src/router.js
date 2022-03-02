import { createRouter, createWebHashHistory } from 'vue-router'

import BuatTulisan from './components/BuatTulisan2.vue'
import BuatMateri from './components/BuatMateri.vue'
import Artikel from './components/HasilArtikel.vue'
import Beranda from './components/BerandaApp.vue'

const router = createRouter({
    history : createWebHashHistory(),
    routes : [
        {
            path : '/',
            redirect : '/beranda',
            name : 'home'
        },
        {
            path : '/beranda',
            component : Beranda,
            name : 'beranda'
        },
        {
            path : '/buat',
            component : BuatMateri,
            name : 'buat'
        },
        {
            path : '/nulis',
            component : BuatTulisan,
            name : 'nulis'
        },
        {
            path : '/artikel/:id',
            component : Artikel,
            name : 'artikel'
        }
    ]
})

export default router;