
 const customStyles = {      
      control: (base, state) => ({
        ...base,
        border: state.isFocused ? 0 : 0,
        boxShadow: state.isFocused ? 0 : 0,
        height: '25px',
        "min-height": '25px',
        position: "relative",
        top: "8px",
        width: "90%",
        fontFamily: "Times New Roman",
        outline: 'none' 
     }),
      indicatorSeparator: () => ({ "display": "none"}),
      indicatorsContainer: () => ({ "display": "none"})

    }  

    export default customStyles;