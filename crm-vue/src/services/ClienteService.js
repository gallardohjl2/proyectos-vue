import api from "../lib/axios";

export default {
    obtenerClientes(){
        return api.get('/clientes');
    }, 
    agregarCliente( data ){
        return api.post('/clientes', data)
    }, 

    obtenerCliente ( id ){
         return api.get('/clientes/' + id)
    },

    actualizarCliente (id, data){
         return api.patch('/clientes/' + id, data)
    }, 

    cambiarEstado (id, estado){
        return api.patch('/clientes/' + id, {estado : !estado})
    }, 

    eliminarCliente (id){

        return api.delete('/clientes/' + id)
    }
}