const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();

// Controllers
const {getDailyItems, newItem} = require('../controllers/itemsController');

app.use(express.json());
app.use(cors());

// Instantiate controllers. 
router.get('/', getDailyItems);
router.post('/', newItem)

module.exports = router;