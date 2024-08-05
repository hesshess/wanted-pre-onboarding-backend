import dotenv from 'dotenv'; 
dotenv.config(); 

//환경변수 설정 되어있는지 확인
function required(key, defaultValue = undefined){
    const value = process.env[key] || defaultValue;
    if(value == null){ //null 이거나 undefined인 경우
        throw new Error(`Key ${key} is not defined`); 
    } 
    return value;
}

export const config = {
    host:{
        port: parseInt(required('HOST_PORT', 8080))
    },
    db:{
        host: required('DB_HOST'),
        user: required('DB_USER'),
        database: required('DB_DATABASE'),
        password: required('DB_PASSWORD'), 
    }
}