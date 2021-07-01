import { Travel } from '../models/Travels.js';
import { Testimonial } from '../models/Testimonials.js';

const homePage = async(req, res) =>{
    //Consultar 3 Viajes del modelo viaje (BD)

    const promiseDB = [];

    promiseDB.push(Travel.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));

    try {
        const result = await Promise.all(promiseDB);
        res.render('home', {
            page:'Inicio',
            class:'home',
            travels: result[0],
            testimonials: result[1]
        }) 
    } catch (error) {
        console.log(error)
    }
}

const pageUS = (req, res) =>{
    res.render('Us', {
        page:'Nosotros'
    })
}

const pageTravels = async (req, res) =>{
    //Consultar la BD
    const travels = await Travel.findAll();

    res.render('travels', {
        page:'Próximos viajes',
        travels
    })
}

const pageTestimonials = async (req, res) =>{
    try {
        const testimonials = await Testimonial.findAll();
        res.render('testimonials', {
            page:'Testimoniales',
            testimonials
        });
    } catch (error){
        console.log(error);
    }
}

// Muestra un viaje por su slog
const pageDetailTravel = async(req, res) =>{
    const { slug } = req.params;
    try{
        const travel = await Travel.findOne({ where : { slug } });
        
        res.render('travel', {
            page: 'Información del viaje',
            travel
        })
    } catch (error) {
        console.log(error);
    }
}

export{
    homePage,
    pageUS,
    pageTravels,
    pageTestimonials,
    pageDetailTravel,
}