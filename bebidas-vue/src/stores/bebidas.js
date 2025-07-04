import { ref, reactive , onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import  APIService from '../services/APIService'
import { useModalStore } from './Modal'

export const useBebidasStore = defineStore('bebidas', () =>{

    const modal = useModalStore()
    const categorias  = ref([])
    const busqueda = reactive({
        nombre:'', 
        categoria:''
    })

    const recetas = ref([])
    const receta = ref({})

    onMounted  ( async function () {
        const {data:{drinks}} = await APIService.obtenerCategorias()
        categorias.value = drinks
        //console.log(drinks)
    }) 

    async function  obtenerRecetas ( ){
         const {data:{drinks}} = await APIService.buscarRecetas( busqueda )
         recetas.value=drinks
     
    }

    async function seleccionarBebidas( id ){
        const {data:{drinks}} = await APIService.buscarReceta( id )
        receta.value = drinks[0]

        modal.handleClickModal()
    }

    const noRecetas = computed(()=>recetas.value.length === 0)

    return {
        categorias, 
        busqueda, 
        obtenerRecetas, 
        recetas, 
        seleccionarBebidas,
        receta,
        noRecetas
    }
})