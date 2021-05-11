require('dotenv').config()
const { leerInput,inquirerMenu, pausa,listadoLugares } = require("./helpers/inquirer");
const { Busquedas } = require("./models/busquedas");
const axios = require('axios')
const main = async() =>{

    const busquedas = new Busquedas;
    let opt 
    do {
        opt = await inquirerMenu();
        console.log({opt})
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(lugar);
              
                const id = await listadoLugares(lugares);
                if(id==='0'){
                    continue

                }
                const lugarSel = lugares.find( l =>l.id === id );
                
                busquedas.agregarHstorial(lugarSel.name)
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
                console.clear()
                console.log('\nInformacion de la ciudad\n'.cyan)
                console.log('ciudad: ',lugarSel.name.cyan);
                console.log('Lat: ',lugarSel.lat);
                console.log('Lng: ',lugarSel.lng);
                console.log('Temperatura: ',clima.temp);
                console.log('Minima: ',clima.min);
                console.log('Maxima: ',clima.max);
                console.log('Como esta el clima',clima.desc.cyan)
                break;
            case 2:
                busquedas.historial.forEach((lugar, i) =>{
                    const idx = `${i+1}`.cyan
                    console.log(`${idx} ${lugar}`);
                })
            default:
                break;
        }

       if(opt !== 0) await pausa()

    } while (opt !== 0);
}
main()