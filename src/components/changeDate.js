import React from 'react';

export const ChangeDate = (title, callback) => {
   return (
       <button key={1} className="change-date" onClick={callback}>
           <i className="far fa-calendar-alt"></i>
           {title}
       </button>
   )
}