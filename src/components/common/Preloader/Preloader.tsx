import React, { FC } from "react";
import mStyle from "./Preloader.module.css";

const Preloader: FC = (props) => {

   return (
      <div className={mStyle.kart_loader}>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
	<div className={mStyle.sheath}>
			<div className={mStyle.segment}></div>
	</div>
</div>
   )
}


export default Preloader;