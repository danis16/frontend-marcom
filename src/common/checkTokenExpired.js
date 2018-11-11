import decode from 'jwt-decode';

const checkTokenExpired = {
    isTokenExpired : (token) => {
        try
        {
            console.log('Check Token - chekTokenExporired.js Debugger');
            console.log(token);

            if(token !== null || typeof token !== 'undefined')
            {
                const decoded = decode(token, {complete: true});
                console.log(decoded);
                console.log(decoded.exp);
                console.log(Date.now() / 1000);
                if (decoded.exp < Date.now() / 1000)
                {
                    console.log("Harusnya ke sini");
                    localStorage.clear();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return true;
            }
        }
        catch (err)
        {
            if(err.message === "Invalid token specified")
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
};

export default checkTokenExpired;