import { openrouter } from '../lib/ia'
import { streamText } from 'ai'

export default {
    async generarReceta (prompt){
        const resultado = streamText({
            model:openrouter('meta-llama/llama-3.3-70b-instruct:free'),
            prompt, 
            system:'Eres un bartender experto',
            temperature:1
        })

         return resultado.textStream
    }
}