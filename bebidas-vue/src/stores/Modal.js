import { ref, computed } from 'vue'

import { defineStore } from 'pinia'
import { useFavoritosStore } from './favoritos'
import { useBebidasStore } from './bebidas'

export const useModalStore  = defineStore ('modal', ()=>{

    const favoritos = useFavoritosStore()
    const bebidas = useBebidasStore()
    const modal = ref(false)


    function handleClickModal (){
        modal.value = !modal.value
    }

    const textoBoton = computed(() =>{
        return favoritos.existeFavorito(bebidas.receta.idDrink) ? 'Eliminar de Favoritos': 'Agregar Favorito a Favoritos'
    })

    return{
        modal,
        handleClickModal,
        textoBoton
    }
})