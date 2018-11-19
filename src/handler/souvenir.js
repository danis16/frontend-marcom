import axios from 'axios';
import appconfig from '../config/app.config.json';

const souvenir = {
    GetAllHandler : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.souvenir,
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('souvenir Get All : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.souvenir);
        console.log(token);

        try
        {
            let result = await axios(option);
            console.log(result);
            return result.data;
        }
        catch (error) 
        {
            return error.response.data;
        }
    },





    // GetAllSupplierHandlerSearch : async(query) => {
    //     let token = localStorage.getItem(appconfig.secure_key.token);

    //     let option = {
    //         url: appconfig.base_url + appconfig.endpoints.supplier + 'search',
    //         method: 'POST',
    //         headers: {
    //             'suproapptoken' : token,
    //             'Content-Type' : 'application/json'
    //         },
    //         data: {
    //             filter: query
    //         }
    //     };

    //     console.log('Supplier GetAllSupplierHandlerSearch : Axios User');
    //     console.log(appconfig.base_url + appconfig.endpoints.supplier + 'search');
    //     console.log(token);
    //     console.log(option);

    //     try
    //     {
    //         let result = await axios(option);
    //         console.log(result);
    //         return result.data;
    //     }
    //     catch (error) 
    //     {
    //         return error.response.data;
    //     }
    // },
    GetDetailBySouvenirIDHandler : async(id) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.souvenir+ id,
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Souvenir Get Detail : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.souvenir + id);
        console.log(token);

        try
        {
            let result = await axios(option);
            console.log(result);
            return result.data;
        }
        catch (error) 
        {
            return error.response.data;
        }
    },
    
    GetListUnitName : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.souvenir + "getunit",
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Souvenir GetListUnitName : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.souvenir + "getunit");
        console.log(token);
        console.log(option);

        try
        {
            let result = await axios(option);
            console.log('Supplier GetListUnitName Result : Axios User');
            console.log(result);
            return result.data;
        }
        catch (error) 
        {
            return error.response.data;
        }
    },


    InsertNewSouvenir : async (formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.souvenir,
            method: 'POST',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                code : formdata.code,
                name : formdata.name,
                m_unit_id : formdata.m_unit_id,
                description : formdata.description
            }
        };

        console.log('souvenir Create New : Axios User');

        console.log('Formdata');
        console.log(formdata);

        console.log('Option : Data');
        console.log(option.data);

        console.log('souvenir GetListContactTitleName : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.souvenir);
        console.log(option);

        try
        {
            let result = await axios(option);
            console.log("Result From Axios : ");
            console.log(result);
            return result.data;
        }
        catch (error) 
        {
            return error.response.data;
        }
    },

    updateSouvenir: async formdata => {
        let token = localStorage.getItem(appconfig.secure_key.token);
    
        let option = {
          url: appconfig.base_url + appconfig.endpoints.souve + formdata._id,
          method: "PUT",
          headers: {
            // suproapptoken: token,
            "Content-Type": "application/json"
          },
          data: {
            code : formdata.code,
            name : formdata.name,
            m_unit_id : formdata.m_unit_id,
            description : formdata.description
        }
        };

        console.log("Souvenir Update Exiting Souvenir : Axios User");

    try {
      let result = await axios(option);
      console.log(result);
      return result.data;
    } catch (error) {
      return error.response.data;
    }
  },

  deleteExistingSouvenir: async _id => {
    let token = localStorage.getItem(appconfig.secure_key.token);

    let option = {
      url: appconfig.base_url + appconfig.endpoints.souvenir + _id,
      method: "DELETE",
      headers: {
        // authorization: token,
        "Content-Type": "application/json"
      }
    };

    // console.log("Client Delete Exiting Client : Axios User");

    try {
      let result = await axios(option);
      console.log(result);
      return result.data;
    } catch (error) {
      return error.response.data;
    }
  }
};

export default souvenir;


