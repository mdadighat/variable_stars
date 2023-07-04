import axios from 'axios'
interface Params {
    baseUrl: string
    //headers : any
    method: string
}

//config for get request note that the method as changed to get this is very important
const getConfig : Params = {
    baseUrl: "http://localhost:8000/",
    method: 'GET',
}

export const getStars = async (page: number, perPage: number): Promise<any> =>{
    return await axios({
        ...getConfig,
        url: `${getConfig.baseUrl}` + `stars` + `?page=${page}&per-page=${perPage}`,
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



//funciton to get the count of stars
export const getStarCount = async (): Promise<any> =>{
    return await axios({
        ...getConfig,
        url: `${getConfig.baseUrl}` + `starCount`,
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