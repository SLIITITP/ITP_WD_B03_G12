import React from 'react';


export const VaccinePrint = React.forwardRef((props, ref) => {

    return (
        <>
       
        <table ref={ref} className="" >
    
      <tr>
      </tr>  
      <tbody>{props.children}</tbody>
    </table> 
    </>
    )
})