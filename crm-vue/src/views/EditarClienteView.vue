<script setup>
import { onMounted, reactive } from 'vue';
import { FormKit } from '@formkit/vue'
import { useRoute, useRouter } from 'vue-router'
import ClienteService from '../services/ClienteService';
import  RouterLink  from '../components/UI/RouterLink.vue'
import Heading from "../components/UI/Heading.vue";


const router = useRouter()
const route = useRoute()

const { id } = route.params
// console.log(id)

// const formData = reactive({
//     nombre:'', 
//     apellido: '',
//     email:'', 
//     telefono:'',
//     empresa:'',
//     puesto:''
// })

const formData = reactive({})

onMounted(()=>{
    ClienteService.obtenerCliente(id)
        .then(({data}) => {
            // formData.nombre = data.nombre
            // formData.apellido = data.apellido
            // formData.email = data.email
            // formData.telefono = data.telefono
            // formData.empresa = data.empresa
            // formData.puesto = data.puesto

            Object.assign(formData, data)

        })
})


defineProps({
    titulo:{
        type:String
    }
})


const handleSubmit = ( data ) =>{

    ClienteService.actualizarCliente(id, data)
        .then(() => router.push({name:'listado-clientes'}))
    .catch( error => console.log(error))

};
 


</script>

<template>
     <div>
        <div class="flex justify-end">
            <RouterLink 
                too="listado-clientes"
            >
                Volver
            </RouterLink>
        </div>

        <Heading>{{ titulo }}</Heading>

        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit
                    type="form"
                    submit-label="Guardar Cambios"
                    incomplete-message="No se pudo enviar, revisa los mensajes"
                    @submit="handleSubmit"
                    :value="formData"
                >
                    <FormKit 
                        type="text"
                        label="Nombre"
                        name="nombre"
                        placeholder="Nombre de Cliente"
                        validation="required"
                        :validation-messages="{ required: 'El Nombre del Cliente es Obligatorio' }"
                        v-model="formData.nombre"
                    />

                    <FormKit 
                        type="text"
                        label="Apellido"
                        name="apellido"
                        placeholder="Apellido de Cliente"
                        validation="required"
                        :validation-messages="{ required: 'El Apellido del Cliente es Obligatorio' }"
                        v-model="formData.apellido"
                    />

                    <FormKit 
                        type="text"
                        label="Email"
                        name="email"
                        placeholder="Email de Cliente"
                        validation="required|email"
                        :validation-messages="{ required: 'El Email del Cliente es Obligatorio', email: 'Coloca un email válido' }"
                        v-model="formData.email"
                        />

                    <FormKit 
                        type="text"
                        label="Teléfono"
                        name="telefono"
                        placeholder="Teléfono: XXX-XXX-XXXX"
                        validation="?matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
                        :validation-messages="{ matches: 'El Formato no es válido' }"
                        v-model="formData.telefono"
                    />

                    <FormKit 
                        type="text"
                        name="empresa"
                        label="Empresa"
                        placeholder="Empresa de Cliente"
                        v-model="formData.empresa"
                    />

                    <FormKit 
                        type="text"
                        name="puesto"
                        label="Puesto"
                        placeholder="Puesto de Cliente"
                        v-model="formData.puesto"
                    />
                </FormKit>
            </div>
        </div>
    </div>
</template>

<style>
    .formkit-wrapper {
        max-width: 100%;
    }
</style>



