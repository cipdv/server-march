const _ = require ('lodash');
const Path = require ('path-parser');
const {URL} = require ('url');
const requireLogin = require ('../middlewares/requireLogin');
const requireCredits = require ('../middlewares/requireCredits');
const Mailer = require ('../services/Mailer');
const surveyTemplate = require ('../services/emailTemplates/surveyTemplate');
const mongoose = require ('mongoose');

const Survey = mongoose.model ('surveys');

module.exports = (app) => {
    app.get('/api/surveys/:surveyId/:choice', (req, res)=> {
        res.send('thanks for your feedback');
    })

    app.get('/api/surveys', requireLogin, async (req, res)=>{
        const surveys = Survey.find({ _user: req.user.id }).select({recipients: false});
        
        res.send(surveys);
    })

    app.post('/api/surveys/webhooks', (req, res)=>{
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
        .map(({email, url})=>{
            const match = p.test(new URL (url).pathname);
            if (match) {
                return {email, surveyId: match.surveyId, choice: match.choice}
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({surveyId, email, choice})=> {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: {email: email, responded: false}
                },
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.reponded': true},
                lastResponded: new Date ()
            }).exec();
        })
        .value();

        console.log(events)
        res.send({});
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