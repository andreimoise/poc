import axios from 'axios';

const requestUrl = 'http://localhost:8080/ords/ms0866501ded/mw560f01/block/department/';

export default {
   
    insertDepartment: ( payload ) => {
      return axios.post( requestUrl, payload )
        .then(() => {
          return Promise.resolve( true )
        })
        .catch(( error ) => {
          console.log( 'Error while inserting record', error );
          return Promise.resolve( false )
        })
    },
  
    updateDepartment: ( payload ) => {
      return axios.put( requestUrl, payload )
        .then(() => {
          return Promise.resolve();
        })
        .catch(( error ) => {
          console.log( 'Error while updating record', error );
          return Promise.resolve( false );
        })
    },
  
    deleteDepartment: ( payload ) => {
      return axios.delete( requestUrl, payload )
        .then(() => {
          return Promise.resolve();
        })
        .catch(( error ) => {
          console.log( 'Error while deleting record', error );
          return Promise.resolve( false );
        })
    }
  }
