import axios from "axios";
import appconfig from "../config/app.config.json";

const employee = {
  GetAllHandler: async () => {
    let token = localStorage.getItem(appconfig.secure_key.token);

    let option = {
      url: appconfig.base_url + appconfig.endpoints.employee,
      method: "GET",
      headers: {
        suproapptoken: token,
        "Content-Type": "application/json"
      }
    };

    console.log("employee Get All : Axios User");
    console.log(appconfig.base_url + appconfig.endpoints.employee);
    console.log(token);

    try {
      let result = await axios(option);
      console.log(result);
      return result.data;
    } catch (error) {
      return error.response.data;
    }
  },

  GetAllEmployeeHandlerSearch : async(query) => {
      let token = localStorage.getItem(appconfig.secure_key.token);

      let option = {
          url: appconfig.base_url + appconfig.endpoints.employee + 'search',
          method: 'POST',
          headers: {
              'suproapptoken' : token,
              'Content-Type' : 'application/json'
          },
          data: {
              filter: query
          }
      };

      console.log('Supplier GetAllSupplierHandlerSearch : Axios User');
      console.log(appconfig.base_url + appconfig.endpoints.employee + 'search');
      console.log(token);
      console.log(option);

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

  GetDetailByEmployeeIDHandler: async id => {
    let token = localStorage.getItem(appconfig.secure_key.token);

    let option = {
      url: appconfig.base_url + appconfig.endpoints.employee + id,
      method: "GET",
      headers: {
        suproapptoken: token,
        "Content-Type": "application/json"
    
      }
    };

    console.log("Supplier Get Detail : Axios User");
    console.log(appconfig.base_url + appconfig.endpoints.employee + id);
    console.log(token);

    try {
      let result = await axios(option);
      console.log(result);
      return result.data;
    } catch (error) {
      return error.response.data;
    }
  },

  GetListCompanyName: async () => {
    let token = localStorage.getItem(appconfig.secure_key.token);

    let option = {
      url: appconfig.base_url + appconfig.endpoints.employee + "getcompany",
      method: "GET",
      headers: {
        suproapptoken: token,
        "Content-Type": "application/json"
      }
    };

    console.log("Employee GetListCompanyName : Axios User");
    console.log(
      appconfig.base_url + appconfig.endpoints.employee + "getcompany"
    );
    console.log(token);
    console.log(option);

    try {
      let result = await axios(option);
      console.log("Supplier GetListCompanyName Result : Axios User");
      console.log(result);
      return result.data;
    } catch (error) {
      return error.response.data;
    }
  },

  InsertNewEmployee: async formdata => {
    let token = localStorage.getItem(appconfig.secure_key.token);

    let option = {
      url: appconfig.base_url + appconfig.endpoints.employee,
      method: "POST",
      headers: {
        suproapptoken: token,
        "Content-Type": "application/json"
      },
      data: {
        employee_number: formdata.employee_number,
        first_name: formdata.first_name,
        last_name: formdata.last_name,
        m_company_id: formdata.m_company_id,
        email: formdata.email
      }
    };

    console.log("employee Create New : Axios User");

    console.log("Formdata");
    console.log(formdata);

    console.log("Option : Data");
    console.log(option.data);

    console.log("employee GetListContactTitleName : Axios User");
    console.log(appconfig.base_url + appconfig.endpoints.employee);
    console.log(option);

    try {
      let result = await axios(option);
      console.log("Result From Axios : ");
      console.log(result);
      return result.data;
    } catch (error) {
      return error.response.data;
    }
  },

  updateEmployee: async formdata => {
    let token = localStorage.getItem(appconfig.secure_key.token);

    let option = {
      url: appconfig.base_url + appconfig.endpoints.employee + formdata._id,
      method: "PUT",
      headers: {
        // suproapptoken: token,
        "Content-Type": "application/json"
      },
      data: {
        employee_number: formdata.employee_number,
        first_name: formdata.first_name,
        last_name: formdata.last_name,
        m_company_id: formdata.m_company_id,
        email: formdata.email
      }
    };

    // let option = {
    //   url: appconfig.base_url + appconfig.endpoints.client + formdata._id,
    //   method: "PUT",
    //   headers: {
    //     authorization: token,
    //     "Content-Type": "application/json"
    //   },
    //   data: {
    //     nama_client: formdata.nama_client
    //   }
    // };

    console.log("Employee Update Exiting Employee : Axios User");

    try {
      let result = await axios(option);
      console.log(result);
      return result.data;
    } catch (error) {
      return error.response.data;
    }
  },

  deleteExistingEmployee: async _id => {
    let token = localStorage.getItem(appconfig.secure_key.token);

    let option = {
      url: appconfig.base_url + appconfig.endpoints.employee + _id,
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

export default employee;
