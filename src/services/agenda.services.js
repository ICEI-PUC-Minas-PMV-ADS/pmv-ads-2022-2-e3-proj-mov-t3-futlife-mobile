import API from './webapi.services';
import {BASE_URL} from './urls';

export const getAgenda = async () => {
  try{
    return await API.get(`${BASE_URL}/660/agenda`).then( 
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

export const insertAgenda = async (param) => {
  try{
    return await API.post(`${BASE_URL}/660/agenda`, param).then( 
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

export const updateAgenda = async (param) => {
  try{
    return await API.put(`${BASE_URL}/660/agenda/${param.id}`, param).then( 
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

export const deleteAgenda = async (id) => {
  try{
    return await API.delete(`${BASE_URL}/660/agenda/${id}`).then( 
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

export const findHorario = async (param) => {
  try{        
    let url = `${BASE_URL}/660/agenda?data=${param.data}&hora=${param.hora}&idQuadra=${param.idQuadra}`;
    console.log('url: '+url);
    return await API.get(url).then( 
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
