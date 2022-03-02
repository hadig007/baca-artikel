import { createStore } from 'vuex'

const store = createStore({
    state(){
        return{
            artikel : {
                judul : '',
                penulis : '',
                kategori : '',
            },
            allArticle : [],
            allImage:[],
            responseToShow : {}
        }
    },
    mutations:{
        GET_ARTICLE(state, payload){
            state.artikel.judul = payload.judul
            state.artikel.penulis = payload.penulis
            state.artikel.kategori = payload.kategori
            console.log(state.artikel)
        },
        GET_RESPONSE(state, payload){
            state.responseToShow = payload
            console.log(state.responseToShow)
        },
        GET_ALL_ARTICLE(state, payload){
            state.allArticle = payload
            console.log(state.allArticle)
        },
        GET_ALL_IMAGE(state, payload){
            state.allImage = payload
            console.log(state.allImage)
        },
    },
    actions:{
        getArticle(context, payload){
            return context.commit('GET_ARTICLE', payload)
        },
        getResponse(context, payload){
            return context.commit('GET_RESPONSE', payload)
        },
        getAllArticle(context, payload){
            return context.commit('GET_ALL_ARTICLE', payload)
        },
        getAllImage(context, payload){
            return context.commit('GET_ALL_IMAGE', payload)
        }
    }
})

export default store