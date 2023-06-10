const { Router } = require('express');
const router = Router();

router.get('/',(req,res)=>{
    const data = {
        "nombre": "Javier",
        "apellido": "Marquez",
        "noControl": "19450673",
        "asistencia": true
    };
    res.json(data);
});

module.exports = router;