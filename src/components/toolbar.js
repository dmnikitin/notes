import React from 'react';
export default class Toolbar extends React.Component {

    // module with functions

	handleChange = (e) => {
	
		let text =  window.getSelection().toString();
		let content = this.props.content;
		content.split(text)
	}
	


    render() {

        return (
            <div className="toolbar">
			    <button id="bold" title="Bold (Ctrl+B)"><i className="fa fa-bold"></i></button>
			    <button id="italic" title="Italic (Ctrl+I)" onClick={this.handleChange}><i className="fa fa-italic"></i></button>
			    <button id="underline" title="Underline (Ctrl+U)"><i className="fa fa-underline"></i></button>
			    <select name="fonts" id="fonts">
			        <option value="Arial" defaultValue>Arial</option>
			        <option value="Georgia">Georgia</option>
			        <option value="Tahoma">Tahoma</option>
			        <option value="Times New Roman">Times New Roman</option>
			        <option value="Verdana">Verdana</option>
			        <option value="Impact">Impact</option>
			        <option value="Courier New">Courier New</option>
      			</select>
			    <select name="size" id="size">
			        <option value="8">8</option>
			        <option value="10">10</option>
			        <option value="12">12</option>
			        <option value="14">14</option>
			        <option value="16" defaultValue>16</option>
			        <option value="18">18</option>
			        <option value="20">20</option>
			        <option value="22">22</option>
			        <option value="24">24</option>
			        <option value="26">26</option>
			    </select>
			    <button id="align-left" title="Left"><i className="fa fa-align-left"></i></button>
			    <button id="align-center" title="Center"><i className="fa fa-align-center"></i></button>
			    <button id="align-right" title="Right"><i className="fa fa-align-right"></i></button>
			    <button id="list-ul" title="Unordered List"><i className="fa fa-list-ul"></i></button>
			    <button id="list-ol" title="Ordered List"><i className="fa fa-list-ol"></i></button>
			</div>
        )
    }
}