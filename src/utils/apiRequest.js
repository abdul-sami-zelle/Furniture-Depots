export const handleApiRequest = async (url, method = 'GET', data = null, token = null, extraHeaders = {}) => {
    const headers = {
        ...extraHeaders
    }

    if(data) {
        headers["Content-Type"] = "application/json";
    }

    if(token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    const config = {
        method,
        headers
    }

    if(data) {
        config.body = JSON.stringify(data)
    }

    try {
        const response = await fetch(url, config);
        const contentType = response.headers.get('content-type');
        let responseData;

        if(contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text()
        }

        return {
            ok: response.ok,
            status: response.status,
            data: responseData
        }
        
    } catch (error) {
        return {
            ok: false,
            status: 500,
            data: error.message
        }
    }
}