const getDate = (date) => {
      const dd = date.getDate();
      const mm = date.getMonth()+1; 
      const formattedMonth = ("0" + mm).slice(-2);
      // const formattedDay = ("0" + dd).slice(-2);
      const yyyy = date.getFullYear();
      return  dd + '.' + formattedMonth + '.' + yyyy;
	};

let today = getDate(new Date());


const notePreviewDate = (date, value) => {
	const day = date.match(/^(\d{1,2})/g);
	const month = date.match(/(?<!^)(?![\.])(.{2})(?=\.)/g);
	const year = date.match(/(\d{4})/g);
	const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (value === "day") {
    	return `${day}`;
   		} 
    else if (value ==="month") {
		return `${monthArray[month-1]}`;
    	}
    else if (value === "year") {
    	return `${year}`;
		}
    };


const arraySort = array => array.sort((a,b)=> a.index>b.index).sort((a,b)=> (a.priority === b.priority) ? 0 : a.priority? -1 : 1)
    // array.map(curr=> curr.date = curr.date.split('.'));
    // array.sort((a,b) => a.date[0]>b.date[0]).sort((a,b) => a.date[1]>b.date[1]).map(curr=> curr.date = curr.date.join('.'));
    
    
  
	
export { arraySort, today, notePreviewDate };

