import React from 'react';

export const Button = (title, callback) => {
   return (
       <button key={1} className="button" onClick={callback}>
           {title}
       </button>
   )
}