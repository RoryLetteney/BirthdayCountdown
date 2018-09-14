import React from 'react';

export const Button = (title, callback) => {
   return (
       <button className="button" onClick={callback}>
           {title}
       </button>
   )
}