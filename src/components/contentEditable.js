import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class contentEditable extends Component {
    
    shouldComponentUpdate = (nextProps) => 
        (nextProps.html !== ReactDOM.findDOMNode(this).innerHTML) ? true : false;
    
    emitChange = () => {
        
        console.log("this last html", this.lastHtml)

        var html = ReactDOM.findDOMNode(this).innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {

            this.props.onChange({
                data: html
            }, "content")
        }
        this.lastHtml = html;
    }


    componentDidUpdate = () => {
        console.log("DID update this props html ", this.props.html)
        if ( this.props.html !== ReactDOM.findDOMNode(this).innerHTML ) {
           ReactDOM.findDOMNode(this).innerHTML = this.props.html;
        }
    }

 
    render() {
        return (
            
                
            <div 
                className="note-content"
                onInput={this.emitChange} 
                onBlur={this.emitChange}
                contentEditable
                dangerouslySetInnerHTML={{__html: this.props.html}}>
                
            
            </div>
            
        );
    }
}
