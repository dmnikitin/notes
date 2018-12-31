import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class ContentEditable extends Component {

    state = {html: ""}
    
    shouldComponentUpdate = (nextProps) => 
         (nextProps.html !== ReactDOM.findDOMNode(this).innerHTML) ? true : false
   
    
    emitChange = () => {
      
        let html = ReactDOM.findDOMNode(this).innerHTML;
        // console.log("this ", this)
        // console.log( "inner ", html)
        if (this.props.onChange && html !== this.lastHtml) {
           this.props.onChange({
                data: html
            }, "content")
        }
        this.lastHtml = html;
    }

    componentDidUpdate = () => {
        // console.log("DID update this props html ", this.props.html)
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
                dangerouslySetInnerHTML={{__html: this.state.html}}
              >  
            </div>
        );
    }
}
