const getDate = (date) => {
      const dd = date.getDate();
      const mm = date.getMonth()+1; 
      const formattedMonth = ("0" + mm).slice(-2);
      const formattedDay = ("0" + dd).slice(-2);
      const yyyy = date.getFullYear();
      return  formattedDay + '.' + formattedMonth + '.' + yyyy;
	};

let today = getDate(new Date());


const notePreviewDate = (date, value) => {
	// const day = date.match(/^(\d{1,2})/g);
	// const month = date.match(/(?<!^)(?![\.])(.{2})(?=\.)/g);
	// const year = date.match(/(\d{4})/g);
  let x = date.split(".")
 
	const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (value === "day") {
    	return `${x[0]}`;
   		} 
    else if (value ==="month") {
		return `${monthArray[x[1]-1]}`;
    	}
    else if (value === "year") {
    	return `${x[2]}`;
		}
    };

const arraySort = array => array.sort((a,b)=> a.index<b.index).sort((a,b)=> (a.priority === b.priority) ? 0 : a.priority? -1 : 1)
     
export { arraySort, today, notePreviewDate };

