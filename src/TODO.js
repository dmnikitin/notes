

//refs  - only stateful components

render() {
	return <div ref={this.setContainerRef} />
}

setContainerRef = (ref) => {
	this.container = ref
}



// limits on inputs: 
getClassName = type => this.state[type].length && this.state[type].length < limits[type].min ? "form-input-error" :  ' '
const limits = { user: {min: 5, max: 10 } }


// debugger!! на compWillMOunt- видны пропс/стейт



// проверка на таски

static defaultProps = {tasks:[]}
if !tasks.length  return No tasks yet

// cool
onClick={() => {
                      this.setState(state => ({
                        items: state.items.filter(
                          item => item.id !== id
                        ),
                      }));


//  responsive, comments

//v.0.6  auth

// deploy + readme


 // <select name="fonts" id="fonts">
	// 		        <option value="Arial" defaultValue>Arial</option>
	// 		        <option value="Georgia">Georgia</option>
	// 		        <option value="Tahoma">Tahoma</option>
	// 		        <option value="Times New Roman">Times New Roman</option>
	// 		        <option value="Verdana">Verdana</option>
	// 		        <option value="Impact">Impact</option>
	// 		        <option value="Courier New">Courier New</option>
 //      			</select>
	// 		    <select name="size" id="size">
	// 		        <option value="8">8</option>
	// 		        <option value="10">10</option>
	// 		        <option value="12">12</option>
	// 		        <option value="14">14</option>
	// 		        <option value="16" defaultValue>16</option>
	// 		        <option value="18">18</option>
	// 		        <option value="20">20</option>
	// 		        <option value="22">22</option>
	// 		        <option value="24">24</option>
	// 		        <option value="26">26</option>
	// 		    </select>
	// 		    <button id="align-left" title="Left"><i className="fa fa-align-left"></i></button>
	// 		    <button id="align-center" title="Center"><i className="fa fa-align-center"></i></button>
	// 		    <button id="align-right" title="Right"><i className="fa fa-align-right"></i></button>
	// 		    <button id="list-ul" title="Unordered List"><i className="fa fa-list-ul"></i></button>
	// 		    <button id="list-ol" title="Ordered List"><i className="fa fa-list-ol"></i></button>