//login&register
const express = require("express")
const router = express.Router()
const Profiles = require("../../models/Profile")

const passport = require("passport")


//api/users/test api接口
// router.get('/test', (req, res) => {
//     res.json({ mag: 'login work' })
// })
router.get("/test", (req, res) => {
    res.json({ msg: "profile work" })
})

router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
    const profileFields = {}
    if (req.body.type) profileFields.type = req.body.type
    if (req.body.descript) profileFields.descript = req.body.descript
    if (req.body.incode) profileFields.incode = req.body.incode
    if (req.body.expend) profileFields.expend = req.body.expend
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark

    new Profile(profileFields).save()
        .then(profile => {
            res.json(profile)
        })
})


router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有对应信息")
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

//查询单个信息
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile.findOne({ _id: req.params.id })
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有对应信息")
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

//编辑
router.post("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    const profileFields = {}
    if (req.body.type) profileFields.type = req.body.type
    if (req.body.descript) profileFields.descript = req.body.descript
    if (req.body.incode) profileFields.incode = req.body.incode
    if (req.body.expend) profileFields.expend = req.body.expend
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark

    Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: profileFields },
        { new: true }).then(profile => res.json(profile))
})
//删除
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id })
        .then(profile => {
            profile.save().then(profile => res.json(profile))
        })
        .catch(err => res.status(404).json("删除失败"))
})
module.exports = router