import type { Signin } from "@/types/Auth";
import axios from "axios";
import { API_URL_SIGN_IN } from "@/config/api"; 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { useQueries } from "@tanstack/react-query";

const useLogin= () => {

    const handleLogin = async(values: Signin) => {
    
        console.log(values)

        try {
            const response = await axios.post(`${API_URL_SIGN_IN}`, values);
            // console.log(response)
            console.log('Token:', response.data.token);
            console.log('ID:', response.data.id);
          } catch (error) {
            // if (axios.isAxiosError(error)) {
            //   if (error.response) {
            //     // El servidor respondió con un código de estado que cae fuera del rango de 2xx
            //     console.error('Error en la respuesta del servidor:', error.response.data);
            //     console.error('Código de estado:', error.response.status);
            //     console.error('Encabezados:', error.response.headers);
            //   } else if (error.request) {
            //     // La solicitud fue hecha pero no se recibió respuesta
            //     console.error('No ughkiuhhse recibió respuesta del servidor:', error.request);
            //   } else {
            //     // Algo sucedió al configurar la solicitud que provocó un error
            //     console.error('Error en la configuración de la solicitud:', error.message);
            //   }
            // } else {
            //   // Error no relacionado con axios
            //   console.error('Error desconocido:', error);
            // }
            console.log(error)
            
          }
    }

    return {handleLogin}
   


}


export default useSignin