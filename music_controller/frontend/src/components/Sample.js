import React, { Component } from 'react'

export default class Sample extends Component {
    constructor(props) {
        super(props);
        this.sampleCode = this.props.match.params.sampleCode;
    }
    
    render() {
        return (
            <div>
                <h1>SAMPLE{this.sampleCode}</h1>
            </div>
        )
    }
}
