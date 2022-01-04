export const postRequest = (url, bodyObj)=>{
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
    })
}

export const getRequest = (url)=> {
    return fetch(url);
}

export const putRequest = (url, bodyObj)=>{
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
    })
}

export const deleteReq = (url, bodyObj) => {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
    })
}