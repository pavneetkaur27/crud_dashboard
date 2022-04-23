import React, { Component } from "react";
import JSONSchemaForm from "react-jsonschema-form";
import { connect } from 'react-redux';
import { saveUserDetails } from '../../actions/userAction';
import { schema, uiSchema } from './schema';
import "./form.css";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    submit = (e) => {
        let data = e.formData;
        console.log(data);
        this.props.saveUserDetails(data);
    }

    render() {
        return (
            <div className="container" style={{ padding: '40px' }}>
                <div className="row">
                    <div className="col-md-9 ">
                        <JSONSchemaForm
                            schema={schema}
                            uiSchema={uiSchema}
                            onSubmit={this.submit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = {
    saveUserDetails
};


export default connect(mapStateToProps, mapDispatchToProps)(Form);

