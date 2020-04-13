const sendgrid = require ('sendgrid');
const helper = sendgrid.mail;
const keys = require ('../config/keys');

class Mailer extends helper.Mail {
    constructor({subject, recipients}, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        //138 registers the body with the emailer
        this.addContent(this.body);
        //139 add click tracking to be able to track who clicks on links
        this.addClickTracking();
        //139and140 call a function to add recipients to the emailer
        this.addRecipients();


    }

    //139 pulls the email key/value from the recipients array of objects
    formatAddresses (recipients) {
        return recipients.map(({email}) => {
            return new helper.Email(email);
        })
    }

    //139 sendgrids requirements for setting up click tracking
    addClickTracking () {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    //140 define a function to add recipients to the emailer
    addRecipients () {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    //141 setup sendgrid api request for sending emails
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = this.sgApi.API(request);
        return response;
    }

}

module.exports = Mailer;


