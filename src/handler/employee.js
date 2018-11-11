import axios from 'axios';
import appconfig from '../config/app.config.json';

const employee = {
    GetAllHandler : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.employee,
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('employee Get All : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.employee);
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
    GetDetailByEmployeeIDHandler : async(id) => {
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
            url: appconfig.base_url + appconfig.endpoints.employee + "getcompany",
            method: 'GET',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Employee GetListCompanyName : Axios User');
        console.log(appconfig.base_url + appconfig.endpoints.employee + "getcompany");
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


    InsertNewEmployee : async (formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);

        let option = {
            url: appconfig.base_url + appconfig.endpoints.employee,
            method: 'POST',
            headers: {
                'suproapptoken' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                employee_number : formdata.employee_number,
                first_name : formdata.first_name,
                last_name : formdata.last_name,
                m_company_id : formdata.m_company_id,
                email : formdata.email
            }
        };

        console.log('employee Create New : Axios User');

        console.log('Formdata');
        console.log(formdata);

        console.log('Option : Data');
        console.log(option.data);

        console.log('employee GetListContactTitleName : Axios User');
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

export default employee;


