import axios from 'axios';
import appconfig from '../config/app.config.json';

const user = {
    GetAllHandler : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.user,
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('user Get All : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.user);
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
    GetDetailByUserIDHandler : async(id) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier + id,
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Supplier Get Detail : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.supplier + id);
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
    
    GetListCompanyName : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.user + "getcompany",
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('User GetListCompanyName : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.user + "getcompany");
        console.log(token);
        console.log(option);

        try
        {
            let result = await axios(option);
            console.log('Supplier GetListCompanyName Result : Axios User');
            console.log(result);
            return result.data;
        }
        catch (error) 
        {
            return error.response.data;
        }
    },


    InsertNewUser : async (formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.user,
            method: 'POST',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                m_role_id : formdata.m_role_id,
                m_employee_id : formdata.m_employee_id,
                username : formdata.username,
                password : formdata.password,
                re_type_password : formdata.re_type_password
            }
        };

        console.log('user Create New : Axios User');

        console.log('Formdata');
        console.log(formdata);

        console.log('Option : Data');
        console.log(option.data);

        console.log('user GetListContactTitleName : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.employee);
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
    }
}

export default user;


