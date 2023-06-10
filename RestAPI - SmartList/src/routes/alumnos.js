const { Router } = require('express');
const router = Router();

const alumnos = require('../sample.json');

router.get('/',(req,res)=>{
    res.json(alumnos);
});

router.post('/',(req,res)=>{
    const {title, director, year, raiting}= req.body;
    if(title && director && year && raiting){
        //... pasar todo el objeto
        const id = alumnos.length + 1
        const newAlumno = {...req.body, id};
        console.log(newAlumno);
        //guardar
        alumnos.push(newAlumno);
        res.json(alumnos);

    }else{
        res.send('Wrong request');
    }
    res.send('recivido');
});


//eliminar
router.delete('/:id',(req,res)=>{
    const { } = req.params;
});

module.exports = router;