import { Testimonial } from '../models/Testimonials.js'


const saveTestimonial = async (req, res) =>{
    //Validar
    const { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre  === ""){
        errores.push({message : "El nombre esta vacio"});
    }
    if(correo === ""){
        errores.push({message: "El mail esta vacio"});
    }
    if(mensaje === ""){
        errores.push({message : "El mensaje esta vacio"});
    }

    if(errores.length > 0) {

        //Consultar testimoniales existentes
        const testimonials = await Testimonial.findAll();

        //Mostrar la vista con los errores
        res.render('testimonials', {
            page: 'Testimonials',
            errores,
            nombre,
            correo,
            mensaje,
            testimonials
        })
    } else {
        //Almacenarlo en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje,
            });
            
            res.redirect('/testimonials');
        } catch (error) {
            console.log(error);
        }
    }
}

export{
    saveTestimonial
}