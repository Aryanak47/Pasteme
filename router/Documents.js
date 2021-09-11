const express = require("express")
const router = express.Router()
const userDocument = require("../model/UserDocument")

router.get("/", (req, res) => {
    const code = `hello welcome to  Pastebin !`;
    res.render("index", {
        code,
        length:code.split("\n").length,
        language:"plaintext"
    });
});
  
router.post('/save',async (req,res) => {
    const value = req.body.value
    try{
        const document = await userDocument.create({ document: value} )
        res.redirect(`/${document._id}`)
    }catch(err){
        console.log(err)
        res.render("new",{
        code:value
        })

    }
})
router.get('/new',(req,res) => {
    res.render("new")
})
// get document 
router.get('/:id',async (req,res) => {
    const { id } =req.params
    try{
        const {document} = await userDocument.findById(id)
        res.render("index",{
        code:document,
        length:document.split("\n").length,
        id
        })
    }catch(err){
        console.log(err)
        res.send("Something went wrong !")
    }
})
  
// dublicate document
router.get("/:id/dublicate", async(req,res) => {
    const { id } =req.params
    try{
        const {document} = await userDocument.findById(id)
        res.render("new",{
        code:document
        })

    }catch(err){
        console.log(err)
        res.redirect(`/${id}`)
    }


})

module.exports = router