import express from 'express';
import {homePage, pageUS, pageTestimonials, pageTravels, pageDetailTravel} from '../controllers/paginasController.js';
import {saveTestimonial} from '../controllers/testimonialsController.js'

const router = express.Router();

router.get('/', homePage);

router.get('/us', pageUS);

router.get('/travels', pageTravels);

router.get('/travels/:slug', pageDetailTravel);

router.get('/testimonials', pageTestimonials);
router.post('/testimonials', saveTestimonial);

export default router;