import React from 'react';

export const ServicePrint = React.forwardRef((props, ref) => {

    return (
        <>
       
        <table ref={ref} className="table table-striped" >
    
      <tr>
      </tr>  
      <tbody>{props.children}</tbody>
    </table> 
    </>
    )
})