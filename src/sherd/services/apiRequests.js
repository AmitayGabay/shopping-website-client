import axios from "axios";

const apiGet = async (url, token) => {
    try {
        let { data } = await axios({
            method: "GET",
            url,
            params: token
        })
        return data;
    }
    catch (err) {
        throw err;
    }
}

const apiPost = async (url, body, token) => {
    try {
        let { data } = await axios({
            method: "POST",
            url,
            data: body,
            params: token
        })
        return data;
    }
    catch (err) {
        throw err;
    }
}

const apiPut = async (url, body, token) => {
    try {
        let { data } = await axios({
            method: "PUT",
            url,
            data: body,
            params: token
        })
        return data;
    }
    catch (err) {
        throw err;
    }
}

const apiDelete = async (url, body = {}, token) => {
    try {
        let { data } = await axios({
            method: "DELETE",
            url,
            data: body,
            params: token
        })
        return data;
    }
    catch (err) {
        throw err;
    }
}

export {
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
}