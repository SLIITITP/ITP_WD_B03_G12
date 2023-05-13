import React from 'react';


export const AdmissionPrint = React.forwardRef((props, ref) => {

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