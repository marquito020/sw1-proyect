import { BASE_URL } from "../constants/routes";

export const changeRol = async (id,rol) => {
    const url = `${BASE_URL}/api/paymentUser${id}`;
    const data = {
        rol
    }
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    const dataResponse = await response.json(); 
    return dataResponse;
}