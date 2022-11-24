const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();

// Controllers
const {getDailyItems, newItem, getSingleDailyItem, removeDailyItem, updateDailyItem} = require('../controllers/itemsController');

app.use(express.json());
app.use(cors());

// Instantiate controllers. 
router.post('/', newItem);
router.get('/', getDailyItems);
router.get('/:id', getSingleDailyItem);
router.patch('/:id', updateDailyItem);
router.delete('/:id', removeDailyItem);


module.exports = router;