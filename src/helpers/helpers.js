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
  let regex = /^(\d{1,2})/g;
  console.log(regex.exec(date))

  let day = date[0] + date[1];
  let month = date[3]+date[4];
  let year= date[6]+date[7]+date[8]+date[9];
 
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

const arraySort = array => array.sort((a,b)=> a.index<b.index).sort((a,b)=> (a.priority === b.priority) ? 0 : a.priority? -1 : 1)
     
export { arraySort, today, notePreviewDate };

