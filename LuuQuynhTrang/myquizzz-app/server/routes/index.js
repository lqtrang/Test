var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('D:\kltn-2020\LuuQuynhTrang\myquizzz-app\src\app\hompage\hompage.component.html');
});
module.exports = router;