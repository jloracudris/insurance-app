export const getPlateInfo = function (plate) {
    const options = {
        method: 'POST',
        body: JSON.stringify({data: {"placa":plate,"type":1 }}),
        headers:{
            'Content-Type': 'application/json',
            'referer': 'https://eva.segurosbeta.com/pay'
        }
    }

    return fetch("https://eva.segurosbeta.com/admin/transfiriendo/getQuoteSoat",
            options
        ).then(res => {
            return res.json()
        }).then(response => {            
            return response.return;
        })
}