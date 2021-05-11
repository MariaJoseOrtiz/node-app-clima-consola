const inquirer= require('inquirer');
require('colors');

const preguntas=[
    {
        type:'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices:[
            {
                value: 1,
                name: `${'1.'.cyan} Buscar ciudad`
        
            },
            {
                value: 2,
                name: `${'2.'.cyan} Historial`
        
            },
            {
                value: 0,
                name: `${'0.'.cyan} Salir`
        
            },
        ]
    }
];


const inquirerMenu = async()=>{
    console.clear();
    console.log('======================='.cyan);
    console.log(' Seleccione una opcion'.white);
    console.log('=======================\n'.cyan);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa=async ()=>{
   const question =[
       {
        type: 'input',
        name: 'enter',
        message: `Presione ${'enter'.cyan} para continuar`
       }
       
   ]
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async(mensaje)=>{
    
    const question=[
        { 
        type: 'imput',
        name: 'desc',
        message:mensaje,
        validate(value){
            if(value.length === 0){
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }
];
    const {desc}= await inquirer.prompt(question);
    return desc;

}

const listadoLugares = async(lugares =[])=>{
    try{
    const choices= lugares.map((lugar, i) =>{
        const idx =`${i+1}`.cyan
        return{
            value: lugar.id,
            name: `${idx} ${lugar.name}`
        }
    })
    choices.unshift({
        value:'0',
        name:'0.'.cyan + ' Cancelar'
    })
    const preguntas =[
        {
            type: 'list',
            name: 'id',
            message:'Seleccione lugar: ',
            choices:choices
        }
    ]
    const {id}=await inquirer.prompt(preguntas)
    return id
}catch(e){
    console.log(e)
}
}
const confirmar = async(message)=>{
    const question =[
        {
            type:'confirm',
            name: 'ok',
            message
        }
    ];
    const{ok}=await inquirer.prompt(question);
    return ok;
}
const mostarListadoTareasCheck = async(tareas =[])=>{
    const choices= tareas.map((tarea, i) =>{
        const idx =`${i+1}`.cyan
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true :false
        }
    })
    choices.unshift({
        value:'0',
        name:'0.'.cyan + ' Cancelar'
    })
    const preguntas =[
        {
            type: 'checkbox',
            name: 'ids',
            message:'Seleccione',
            choices:choices
        }
    ]
    const {ids}=await inquirer.prompt(preguntas)
    return ids
    }
module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listadoLugares,
    confirmar,
    mostarListadoTareasCheck 

}