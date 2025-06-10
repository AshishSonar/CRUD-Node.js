const express = require("express");
const router = express.Router();
const menu = require("./../models/menu")

router.post('/', async (req, res)=>{
    try{
        const data = req.body
        const newMenu = new menu(data)
        const response = await newMenu.save()
        console.log('new menu added')
        res.status(200).json(response)
    }catch(error){
        console.log("failed", error)
        res.status(200).json({error: 'internal server error'})
    }
})

router.get('/', async (req, res)=> {
    try{
        const listOfMenu = await menu.find()
    console.log('menu fetched', listOfMenu)
    res.status(200).json(listOfMenu)
    }catch(error){
        console.log('internal server error', error)
        res.status(500).json({error: 'internal server error'})
    }
})

router.put('/:id', async(req, res) =>{
    try{
        const menuId = req.params.id
        const updatedData = req.body
        const response = await menu.findByIdAndUpdate(menuId, updatedData, {new: true, runValidators: true})

        if(!response){
            console.log('menu not found')
            res.status(404).json({errror: "menu not found"})
        }

        console.log('menu updated')
        res.status(200).json(response)
    }catch(error){
        console.log('internal server error', error)
        res.status(500).json({error: 'internal server error'})
    }
})


router.delete('/:id', async(req, res) => {
    try{
        const menuId = req.params.id
        const response = await menu.findByIdAndDelete(menuId)
        if(!response){
            console.log('menu does not exist')
            res.status(404).json({error: "menu not found"})
        }
        console.log('menu item deleted')
        res.status(200).json({message: "menu deleted"})
    }catch(error){

    }
})

module.exports =  router
