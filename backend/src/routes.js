const express = require('express');
const router = express.Router();

const { celebrate, Segments } = require('celebrate');
const auth = require('./utils/auth');

const SellerController = require('./controllers/SellerController');
const FoodController = require('./controllers/FoodController');
const ProfileController = require('./controllers/ProfileController');

router.post('/api/seller/register', celebrate({
   [Segments.BODY]: auth.sellerRegister
}), SellerController.register);

router.post('/api/seller/login', SellerController.login);

router.get('/api/food/list', FoodController.list);

router.post('/api/food/create', celebrate({
   [Segments.BODY]: auth.foodCreate
}), FoodController.create);

router.put('/api/food/update/:id', celebrate({
   [Segments.BODY]: auth.foodCreate
}), FoodController.update);

router.delete('/api/food/delete/:id', celebrate({
   [Segments.PARAMS]: auth.foodDelete
}),FoodController.delete);

router.get('/api/profile/list', ProfileController.list);

module.exports = router;