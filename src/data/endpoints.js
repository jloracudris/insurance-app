import axios from 'axios';

export const getPlateInfo = function (plate) {
    const options = {
        url: "https://eva.segurosbeta.com/admin/transfiriendo/getQuoteSoat",
        method: 'POST',
        data: JSON.stringify({data: {"placa":plate,"type":1 }}),
        headers:{
            'Content-Type': 'application/json',
            'referer': 'https://eva.segurosbeta.com/pay'
        }
    }    

    return axios(options);
}