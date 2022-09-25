import React from 'react'
import {Link} from 'react-router-dom'

function Pagination({children, setPage,paginationLength, setLimit,queryState}) {

function changeLimit(e){
    setLimit(e.target.value);
    queryState(state=>!state)
}

//When you click on a page number, it updates the page variable in userSearch and runs a new axios call because of queryState
function nextPage(e){
    setPage(e.currentTarget.dataset.page);
    queryState(state=>!state);
}

  return (
    <div className='container'>
        <ul className='pagination d-inline-flex'>
            
            {
            paginationLength===0
            ?
                <li key={0} className='page-item'>
                    <Link data-page={1}onClick={nextPage}className="page-link">
                        1
                    </Link>    
                </li>
            
            :
            Array(paginationLength).fill(null).map((value,index)=>{
                return ( 
                    <li key={index} className='page-item'>
                        <Link data-page={index+1}onClick={nextPage}className="page-link">
                            {index+1}
                        </Link>    
                    </li>)
            
            })}
        </ul>




        <div className="form-group col-md-4 ">
            <label htmlFor="inputState">Showing number of results</label>
            <select id="inputState" onChange={changeLimit} className="form-control">
                <option>2</option>
                <option>5</option>
                <option selected>10</option>
            </select>
        </div>


        
        {children}
        
    </div>
  )
}

export default Pagination