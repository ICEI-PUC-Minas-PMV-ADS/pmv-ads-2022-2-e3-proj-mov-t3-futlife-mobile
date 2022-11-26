import API from './webapi.services';
import {BASE_URL} from './urls';

export const getHorarios = async () => {
  try{
    return await API.get(`${BASE_URL}/660/horario`).then( 
      response => {
        return response.data;
      },
      error =>{
        console.log(error);
        return  null;
      }
    );
  }catch(error){
    console.log(error);
    return null;
  }
}