const requireLogin = require ('../middlewares/requireLogin');
const requireCredits = require ('../middlewares/requireCredits');
const Mailer = require ('../services/Mailer');
const surveyTemplate = require ('../services/emailTemplates/surveyTemplate');
const mongoose = require ('mongoose');

const Survey = mongoose.model ('surveys');

module.exports = (app) => {
    app.get('/api/surveys/thanks', (req, res)=> {
        res.send('thanks for your feedback');
    })

    app.post ('/api/surveys', requireLogin, requireCredits, async (req, res)=>{
        const {title, body, subject, recipients} = req.body;

        const survey = new Survey ({
            title,
            body,
            subject,
            recipients: recipients.split(',').map(email=>{return {email: email.trim()}}),
            _user: req.user.id,
            dateSent: Date.now()
        })

        const mailer = new Mailer (survey, surveyTemplate(survey));
        try {
        await mailer.send();
        //144 save the survey to database
        await survey.save();
        //144 deduct credits from user's total
        req.user.credits -= 1;
        const user = await req.user.save();
        res.send(user);
        } catch (err) {
            res.send.status(422).send(err);
        }


    })
}