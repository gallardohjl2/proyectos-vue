import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./Modal";
import { useNotificacionStore } from './notificaciones'

export const useFavoritosStore = defineStore("favoritos", () => {
  const bebidas = useBebidasStore();
  const modal = useModalStore();
  const notificaciones = useNotificacionStore()

  const favoritos = ref([]);

  onMounted(() => {
    favoritos.value = JSON.parse(localStorage.getItem("favoritos") ?? []);
  });

  watch(
    favoritos,
    () => {
      sincronizarLocalStorage();
    },
    {
      deep: true,
    }
  );

  function sincronizarLocalStorage() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos.value));
  }

  function existeFavorito() {
    const favoritosLocalStorage = JSON.parse(
      localStorage.getItem("favoritos") ?? []
    );
    return favoritosLocalStorage.some(
      (favorito) => favorito.idDrink === bebidas.receta.idDrink
    );
  }

  function eliminaFavoritos() {
    favoritos.value = favoritos.value.filter(
      (favorito) => favorito.idDrink !== bebidas.receta.idDrink
    );

    notificaciones.mostrar = true
    notificaciones.error = true
    notificaciones.texto = 'Eliminado de Favoritos'

    
  }

  function agregaFavorito() {
    favoritos.value.push(bebidas.receta);
    notificaciones.mostrar = true
    notificaciones.texto = 'Se agrego a Favoritos'
  }
 
  

  function handleClickFavoritos() {
    if (existeFavorito()) {
      eliminaFavoritos();
    } else {
      agregaFavorito();
    }

    modal.modal = false;
  }

  const noFavoritos = computed(() => favoritos.value.length === 0)

  return {
    handleClickFavoritos,
    favoritos,
    existeFavorito,
    noFavoritos
  };
});
