import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class ContentEditable extends Component {

    state = {html: ""}

    componentWillMount = () => {
       console.log(this.props.html) 
       this.setState({html: this.props.html})
    }
    
    shouldComponentUpdate = (nextProps) => 
         (nextProps.html !== ReactDOM.findDOMNode(this).innerHTML) ? true : false
   
    
    emitChange = () => {
      
        let html = ReactDOM.findDOMNode(this).innerHTML;
        // console.log("this ", this)
        // console.log( "inner ", html)
        if (this.props.onChange && html !== this.lastHtml) {
           
           if (this.props.edited === "content") {
               this.props.onChange({
                    data: html
                }, "content")
            } 
            else if (this.props.edited === "name"){
               this.props.onChange({
                    data: html
                }, "name") 
            }
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
                
                onInput={this.emitChange} 
                onBlur={this.emitChange}
                contentEditable
                dangerouslySetInnerHTML={{__html: this.state.html}}
              >  
            </div>
        );
    }
}
