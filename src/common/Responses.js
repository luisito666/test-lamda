const Responses = {
    generic(data = {}, status_code = 200) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: status_code,
            body: JSON.stringify(data)
        }
    },

    _200(data = {}) {
        return this.generic(data)
    },

    _400(data = {}) {
        return this.generic(data, 400)
    }
}

module.exports = Responses;