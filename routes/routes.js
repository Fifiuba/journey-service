const express = require('express')

const journeyRouter = express.Router();
// module.exports = {
//     journeyRouter,
// }

journeyRouter.route('/')
  .get(async (req, res, next) => {
    res.send('hello from dataservice');
})

module.exports = {journeyRouter};