const fs =require('fs')
const axios = require('axios')


class Busquedas {

    historial = []
    dbPath = './db/database.json';
    constructor(){
        this.leerDB()
    }
    get paramsMaxpbox(){
        return{
            'access_token':process.env.MAPBOX_KEY,
               'limit':5,
               'language': 'es'
        }
    }
    get paramsOpenWeather(){
        return{
            
        }
    }
    async ciudad (lugar = ''){
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json `,
            params: this.paramsMaxpbox
    });    
    const resp = await instance.get();
     return resp.data.features.map(lugar=>({
        id:lugar.id,
        name: lugar.place_name,
        lng: lugar.center[0],
        lat:lugar.center[1],
    }));

}
async climaLugar(lat,log){
    try{
        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {
                lat:lat,
                lon:log,
                appid: process.env.OPENWEATHER_KEY,
                units: 'metric',
                lang:'es'
            
            }
    });    
    const resp = await instance.get();
    const { weather,main}= resp.data;
        return{
            desc:weather[0].description,
            min:main.temp_min,
            max:main.temp_max,
            temp:main.temp        
        }

    }catch(error){
        console.log(error);
    }
}
agregarHstorial(lugar =''){
    if(this.historial.includes(lugar.toLocaleLowerCase())){
        return;
    }else{
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();
    }
    //prevenir duplicados
}
guardarDB(){
    const payload={
        historial: this.historial
    };
    fs.writeFileSync(this.dbPath,JSON.stringify(payload))
}
leerDB(){
    if(fs.existsSync(this.dbPath)){
        return;
    }else{
        const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'});
        const data = JSON.parse(info);
        this.historial=data.historial;
    }
}
}
module.exports ={Busquedas} ;