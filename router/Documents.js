const express = require("express")
const router = express.Router()
const userDocument = require("../model/UserDocument")

// middlewear
const checkLogin = (req, res, next) => {
    req.user ? next():res.render("login")
}

router.get("/login",(req,res) => {
    res.render("login")
})

// router.use(checkLogin)
router.get("/",checkLogin,async (req, res,next) => {
    const code = `hello welcome to  Pastebin !`;
    const document = await userDocument.find({user:req.user.id})
    res.render("index", {
        code,
        data: document,
        length:code.split("\n").length,
        language:"plaintext"
    });
});
  
router.post('/save',async (req,res,next) => {
    const updateId = req.query.id
    const value = req.body.value
    if(!value)return res.sendStatus(400)
    let document;
    try{
        if(updateId !== undefined) {
            document = await userDocument.findByIdAndUpdate(updateId,{ document: value},{new:true} )
        }else{
            document = await userDocument.create({ document: value,user:req.user.id} )
        }
        res.redirect(`/document/${document._id}`)
    }catch(err){
        console.log(err)
        res.render("new",{
        code:value
        })

    }
})
router.get('/new',checkLogin,(req,res,next) => {
    res.render("new")
})

// get document 
router.get('/document/:id',checkLogin,async (req,res,next) => {
    const { id } =req.params
    try{
        const arr=[]
        const userDoc = await userDocument.findById(id)
        arr.push(userDoc)
        res.render("index",{
        code:userDoc.document,
        data:arr,
        length:userDoc.document.split("\n").length,
        id
        })
    }catch(err){
        console.log(err)
        res.send("Something went wrong !")
    }
})
  
// dublicate document
router.get("/:id/dublicate", async(req,res,next) => {
    const { id } =req.params
    try{
        const {document} = await userDocument.findById(id)
        res.render("new",{
        code:document,
        id:id
        })

    }catch(err){
        console.log(err)
        res.redirect(`/${id}`)
    }
})





module.exports = router