const requireLogin = require ('../middlewares/requireLogin');
const requireCredits = require ('../middlewares/requireCredits');

const Survey = mongoose.model ('surveys');

module.exports = (app) => {
    app.POST ('/api/surveys', requireLogin, requireCredits, (req, res)=>{
        const {title, body, subject, recipients} = req.body;

        const survey = new Survey ({
            title,
            body,
            subject,
            recipients: recipients.split(',').map(email=>{return {email: email.trim()}}),
            _user: req.user.id,
            dateSent: Date.now()
        })
    })
}