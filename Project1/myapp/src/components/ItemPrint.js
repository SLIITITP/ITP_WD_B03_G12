import React from 'react';
import { useEffect } from 'react';

export const ItemPrint = React.forwardRef((props, ref) => {

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