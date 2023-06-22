import axios from 'axios'
interface Params {
    baseUrl: string
//headers : any
method: string
}

//config for get request note that the method as changed to get this is very important
const getConfig : Params = {
    baseUrl: "http://localhost:8000/stars",
    method: 'GET', 
}

export const getAPI = async (url: string, data: any): Promise<any> =>{
    return await axios({
        ...getConfig,
        url: `${getConfig.baseUrl}`,
        headers: {
            'Content-Type': 'application/json',
        },
    }).then ( (response) => {
        console.log(response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log(error)
        return {
            status: error.status,
            data: error.response
        }
    })
}

