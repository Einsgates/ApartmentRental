import axios from 'axios';

const URL = 'http://localhost:4000';

export function getApartment(opt = {}) {
    return axios.get(`${URL}/api/apartments`, {
        params: opt
    })
}

export function getApartmentDetail(id) {
    return axios.get(`${URL}/api/apartments/${id}`)
}
