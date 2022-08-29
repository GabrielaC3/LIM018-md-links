const axios = jest.fn(() => Promise.resolve({
}));

/* axios.get = jest.fn(() => Promise.resolve({
    status: 200,
    ok: 'ok'
})); */

/* axios.get = jest.fn(() => Promise.reject({
    status: 'Este link esta roto AxiosError: Request failed with status code 404',
    ok: 'fail'
})); */

axios.get = jest.fn(() => new Promise((resolve, reject) => {
    resolve({
        status: 200,
        ok: 'ok'
    })
    reject({
        status: 'Este link esta roto AxiosError: Request failed with status code 404',
        ok: 'fail'
    })
    }));

module.exports = axios;