
export const errorResponse = (response, text = 'помилка', error ) => {
    console.log(text, error)
    return response.json({
        message: text,
        typeMessage:'error'
    })
}

export const successResponse = (response, text = 'успіх', data={}) => {
    console.log(text)
    return response.json({
        ...data,
        message: text,
        typeMessage:'success'
    })
}
export const infoResponse = (response, text = 'информація') => {
    console.log(text)
    return response.json({
        message: text,
        typeMessage:'info'
    })
}
export const warningResponse = (response, text = 'важливо') => {
    console.log(text)
    return response.json({
        message: text,
        typeMessage:'warning'
    })
}

