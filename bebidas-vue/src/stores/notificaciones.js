import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useNotificacionStore = defineStore("notificacion", () => {
  const texto = ref("");
  const error = ref(false);
  const mostrar = ref(false);

watch( mostrar, () =>{

    if(mostrar.value){

        setTimeout(() => {
           texto.value = ""
           error.value = false
           mostrar.value = false
        }, 3000);
    }
})

//   function $reset(){
//     texto.value = ""
//     error.value = false
//     mostrar.value = false
//   }

  return {
    texto,
    error,
    mostrar
  };
});
