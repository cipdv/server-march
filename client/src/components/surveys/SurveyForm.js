import React from 'react';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

class SurveyForm extends React.Component {

    renderFields () {
        return (
            <div>
                <Field label="email title" type="text" name="title" component={SurveyField} />
                <Field label="email subject" type="text" name="subject" component={SurveyField} />
                <Field label="email body" type="text" name="body" component={SurveyField} />
                <Field label="recipient list" type="text" name="emails" component={SurveyField} />
            </div>
        );
    }

    render () {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values=>console.log(values))}> 
                    {this.renderFields()}
                    <Link  to="/surveys" className="red btn-flat white-text">Cancel</Link>                
                    <button type="submit" className="teal btn-flat right white-text">Next
                    <i className="material-icons right">done</i>
                    </button>    
                </form>
            </div>
        )
    }
}

function validate (values) {
    const errors = {};

    errors.emails = validateEmails(values.emails || '');

    if (!values.title) {
        errors.title = 'you must provide a title';
    }
    if (!values.subject) {
        errors.subject = 'you must provide a subject';
    }
    if (!values.body) {
        errors.body = 'you must provide a body message';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);

