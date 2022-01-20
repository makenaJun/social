import React, { useState, FC } from "react";
import mStyle from "./Paginator.module.css";
import { NavLink } from "react-router-dom";
import cn from 'classnames'

type PropsType = {
   totalItemsCount: number
   currentPage: number
   pageSize: number
   onPageChanged: (pageNumber: number)=> void
   portionSize?: number
}

const Paginator: FC<PropsType> = (props) => {
   
   const { totalItemsCount, currentPage, pageSize, onPageChanged, portionSize = 10 } = props

   let pagesCount: number = Math.ceil(totalItemsCount / pageSize);
   let pages: Array<number> = [];

   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
   }

   let portionCount: number = Math.ceil(pagesCount / portionSize);
   let [portionNumber, setPortionNumber] = useState(1);
   let leftPortionPageNumber: number = (portionNumber - 1) * portionSize + 1;
   let rightPortionPageNumber: number = portionNumber * portionSize;

   return (
      <div>
      {portionNumber > 1 && <button onClick={() => setPortionNumber(--portionNumber)} className={mStyle.button}>prev</button>}
         {pages
         .filter(n => n >= leftPortionPageNumber && n <= rightPortionPageNumber)
         .map((num: number) => <NavLink key={num} className={cn(mStyle.item, {
            [mStyle.selected]: currentPage === num
         } )}
            onClick={(e) => onPageChanged(num)}
            to={"/developers?page=" + num}>{num}</NavLink>
         )}
         {portionNumber < portionCount && <button 
         onClick={() => setPortionNumber(++portionNumber)} className={mStyle.button}>next</button>}
      </div>
   )
};


export default Paginator;