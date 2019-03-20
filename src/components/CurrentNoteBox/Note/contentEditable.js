import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class ContentEditable extends Component {

    static propTypes = {
        edited: PropTypes.string,
        currentNote: PropTypes.shape({
            name: PropTypes.string,
            content: PropTypes.string,
            edited: PropTypes.string,
            priority: PropTypes.bool,
            location: PropTypes.string,
            date: PropTypes.string,
            index: PropTypes.number
        }),      
        html: PropTypes.string,
        onChange: PropTypes.func
    }
    
    state = {html: ""}

    componentWillMount = () => this.setState({html: this.props.html})
   
    
    shouldComponentUpdate = (nextProps) => 
         (nextProps.html !== ReactDOM.findDOMNode(this).innerHTML) ? true : false
   
    emitChange = () => {

     let html = ReactDOM.findDOMNode(this).innerHTML;
     if (this.props.onChange && html !== this.lastHtml) {
         if (this.props.edited === "content") {
             if (html) {
                 this.props.onChange({
                     data: html
                 }, "content")
             } else {
                 this.props.onChange({
                     data: ""
                 }, "content")
             }
         } else if (this.props.edited === "name") {
             if (html) {
                 this.props.onChange({
                     data: html
                 }, "name")
             } else {
                   
                let range = document.createRange();
                range.setStart(this.container, 0); 
                
                   
                 setTimeout(() => 
                    {this.props.onChange({ data: "untitled"}, "name")                  
                       
                         ReactDOM.findDOMNode(this).blur()
                       }, 2000)
             }
         }
     }
     this.lastHtml = html;
 }

    componentDidUpdate = () => {       
        if ( this.props.html !== ReactDOM.findDOMNode(this).innerHTML ) {
           ReactDOM.findDOMNode(this).innerHTML = this.props.html;
        }
    }

    clearSelection = () => {
        if (this.props.edited === "name" && window.getSelection) { 
            let sel = window.getSelection()
            let range = document.createRange();
            range.setStart(this.container, 1);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range)
        }
    }
    setContainerRef = (ref) => this.container = ref
  
 
    render() {
   
        return (
            <div 
                ref={this.setContainerRef}
                onSelect={this.clearSelection}
                onInput={this.emitChange} 
                onBlur={this.emitChange}
                contentEditable
                dangerouslySetInnerHTML={{__html: this.state.html}}
              >  
            </div>
        );
    }
}
