const schema = {
    title: 'User Registration Form',
    description: 'Form using Json Schema',
    type: 'object',
    required: ['lastName', 'firstName', 'email', 'password'],
    properties: {
        lastName: {
            title: 'Last Name',
            type: 'string',
        },
        firstName: {
            title: 'First Name',
            type: 'string',
        },
        email: {
            title: 'Email',
            type: 'string',
            format: 'email'
        },
        password: {
            title: 'Password',
            type: 'string'
        },
        dob: {  /* for date type */
            title: 'Date of Birth',
            type: 'string',
            format: 'date'
        },
        age: {
            title: 'Age',
            type: 'number'
        },
        contact: {   /* added upper and lower limits */
            title: 'Phone number',
            type: 'number',
            minLength: 10,
        },
        disabledFieldDemo: {
            title: 'Disabled Field Demo',
            type: 'number'
        },
        gender: {
            title: 'Gender',
            type: 'string',
            anyOf: [
                {
                    type: 'string',
                    title: 'Male',
                    enum: ['Male']
                },
                {
                    type: 'string',
                    title: 'Female',
                    enum: ['Female']
                }
            ]
        },
        isIndian: {
            title: ' Is your nationality Indian?',
            type: 'boolean',
        },
        maritalStatus: {
            title: 'Marital Status',
            type: 'string',
            anyOf: [
                {
                    type: 'string',
                    title: 'Single',
                    enum: ['Single']
                },
                {
                    type: 'string',
                    title: 'Married',
                    enum: ['Married']
                }
            ]
        },
        hasSibling: {
            type: 'string',
            title: 'Do you have any siblings?',
            enum: [
                'No',
                'Yes',
            ],
            default: 'No'
        },
    },
    dependencies: {
        hasSibling: {
            oneOf: [
                {
                    properties: {
                        hasSibling: {
                            enum: [
                                'No'
                            ]
                        }
                    }
                },
                {
                    properties: {
                        hasSibling: {
                            enum: [
                                'Yes'
                            ]
                        },
                        siblingAge: {
                            type: 'number',
                            title: 'How old is he/she?'
                        }
                    },
                    required: [
                        'siblingAge'
                    ]
                }
            ]
        }
    },
};

const uiSchema = {
    'ui:order': ['firstName', '*'],  /* specifying the order of form fields */
    disabledFieldDemo: {    /* disabled the field */
        'ui:disabled': true,
        "ui:placeholder": "Disabled"
    },
    firstName: {
        "ui:placeholder": "Enter your First name",
        "ui:autofocus": true
    },
    lastName: {
        "ui:placeholder": "Enter your Last name",
    },
    email: {
        "ui:placeholder": "Enter your Email",
    },
    contact: {
        "ui:placeholder": "Enter your Phone number",
    },
    age: {
        'ui:widget': 'range'
    },
    gender: {
        "ui:placeholder": "Select your gender",
    },
    maritalStatus: {
        'ui:widget': 'radio'
    },
    password: {
        "ui:placeholder": "Enter your password",
        "ui:widget": "password",
        "ui:help": "Hint: Make it strong!"
    },
}

module.exports = {
    schema,
    uiSchema,
}