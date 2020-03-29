const requireLogin = require ('../middlewares/requireLogin');
const requireCredits = require ('../middlewares/requireCredits');

module.exports = (app) => {
    app.POST ('/api/surveys', requireLogin, requireCredits, (req, res)=>{
        
    })
}