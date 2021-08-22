const router = require("express").Router();
let Bank = require("../models/Bank");

router.route("/add").post((req,res)=>{

    //get data and assign to variable from the request body
    const Acc_no = Number(req.body.Acc_no);
    const Bank_name = req.body.Bank_name;
    const Branch_name = req.body.Branch_name;
    const Acc_Holder_name= req.body.Acc_Holder_name;

    const newBank = new Bank({

        Acc_no,
        Bank_name,
        Branch_name,
        Acc_Holder_name

    })

    newBank.save().then(()=>{
        res.json("Bank Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{

    Bank.find().then((bank)=>{
        res.json(bank) 
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async(req,res)=>{
    //access url parameter
    let userID = req.params.id;
    const {Acc_no,Bank_name,Branch_name,Acc_Holder_name}=req.body;

    const updateBank ={
        Acc_no,
        Bank_name,
        Branch_name,
        Acc_Holder_name
    }

    const update = await Bank.findByIdAndUpdate(userID,updateBank)
    .then(()=>{
        res.status(200).send({status: "User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })


})

router.route("/delete/:id").delete(async(req,res)=>{
    let userID = req.params.id;

    await Bank.findByIdAndDelete(userID).then(()=>{
        res.status(200).send({status: "User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{

    let userID = req.params.id;
    const user = await Bank.findById(userID).then((bank)=>{
        res.status(200).send({status: "User fetched", bank});
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message})
    })
})

module.exports = router;