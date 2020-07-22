const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const {hbsFix} = require('../utils/hbsFix')

const shortURI = require('../models/shortURI');

/* GET home page. */
router.get('/', async function (req, res, next) {

  const docs = await shortURI.find()

  res.render('index', { 
    docs: hbsFix(docs),
    alert: req.query.alert ? true : false,
    invalidURI: req.query.alert ? req.query.alert : null
  });

});

/* POST home page. */
router.post('/', async function (req, res, next) {
  if (!req.body.fullUri) return res.redirect('/');

  if (validUrl.isUri(req.body.fullUri)) {
    await shortURI.create({ full: req.body.fullUri })

    res.redirect('/');
  } else {

    res.redirect(`/?alert=${encodeURI(req.body.fullUri)}`)

  }

});


/* GET Short URI page. */
router.get('/:short', async function (req, res, next) {

  const doc = await shortURI.findOne({ short: req.params.short})

  if (!doc) return res.sendStatus(404)

    doc.clicks++
    doc.save()

    res.redirect(doc.full);


});


module.exports = router;
