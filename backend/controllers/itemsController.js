const storage = require('node-persist');
const dailyItem = require('../models/dailyTaskModels');
let todoArray = [];


// Add Items and persist to Mongo DB
const newItem = ( async (req, res) => {
    try {
        const newTask = await dailyItem.create(req.body);
        res.status(200).json({newTask});
    } catch (error) {
        console.log(error);
    }
});

// Get Items from Mongo
const getDailyItems = (async (req, res) => {
    try {
        const findDailyItem = await dailyItem.find(req.body)
        res.status(200).json({findDailyItem})
    } catch (error) {
        console.log(error);
    }
});

// Get Single Item
const getSingleDailyItem = (async (req, res) => {
    const {id:itemID} = req.params;
    const findSingleItem = await dailyItem.findOne({_id:itemID});

    if(!findSingleItem){
        console.log('item not found');
        return res.status(404).send("Item Not Found")
    }
    res.status(200).json({findSingleItem})
});

// Update Item
const updateDailyItem = (async (req, res) => {
    const {id:itemID} = req.params;
    const editItem = await dailyItem.findByIdAndUpdate({_id:itemID}, req.body, {new: true});
    res.status(200).json({editItem});
    console.log(editItem);

});

// Delete Item
const removeDailyItem = (async (req, res) => {
    const {id:itemID} = req.params;
    await dailyItem.findByIdAndDelete({_id:itemID});
    res.status(200).json({msg: 'item has deleted'});
});

module.exports = {
    newItem,
    getDailyItems,
    getSingleDailyItem,
    removeDailyItem,
    updateDailyItem
}