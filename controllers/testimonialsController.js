import { Testimonial } from '../models/Testimonials.js'


const saveTestimonial = async (req, res) =>{
    //Validar
    const { name, email, message } = req.body;

    const errores = [];

    if(name.trim() === ""){
        errores.push({message : "The name is empty"});
    }
    if(email.trim() === ""){
        errores.push({message: "The email is empty"});
    }
    if(message.trim() === ""){
        errores.push({message : "The message is empty"});
    }

    if(errores.length > 0) {

        //Consultar testimoniales existentes
        const testimonials = await Testimonial.findAll();

        //Mostrar la vista con los errores
        res.render('testimonials', {
            page: 'Testimonials',
            errores,
            name,
            email,
            message, 
            testimonials
        })
    } else {
        //Almacenarlo en la base de datos
        try {
            await Testimonial.create({
                name,
                email,
                message,
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