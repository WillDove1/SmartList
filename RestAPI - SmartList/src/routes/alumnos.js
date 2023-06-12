const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const alumnos = require('../sample.json');

router.get('/',(req,res)=>{
    res.json(alumnos);
});

router.post('/', (req, res) => {
    const {nombre, apellido, numero_control} = req.body;
    if(nombre && apellido && numero_control){
        const id = alumnos.length + 1;
        const newAlumno = {...req.body,id};
        alumnos.push(newAlumno);
        res.json(alumnos);
    }else{
        res.send('error');
    }
  });


//eliminar
router.delete('/:id',(req,res)=>{
    _.each(alumnos, (alumno, i) => {
        const { id} = req.params;
        if(alumno.id == id){
            alumnos.splice(i, 1);
        }
    });
    res.send(alumnos);
})

//Actualizar
router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {nombre, apellido, numero_control} = req.body;
    if(nombre && apellido && numero_control){
        _.each(alumnos,(alumno, i)=>{
            if(alumno.id == id){
                alumno.nombre = nombre;
                alumno.apellido = apellido;
                alumno.numero_control = numero_control;
            }
        });
        res.json(alumnos);
    }else{
        res.status(500).json({error: 'Error'});
    }
})

module.exports = router;