import React,{useState} from "react";
import HeaderButton from "./underLineButton"


export default function Header() {

	const [headerStatus,setHeaderStatus] = useState({
		sideBarOpen:false
	});
	const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" width="30px" height="30px"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>;
	const barIcon =<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"  fill="white" width="30px" height="30px"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>;

	const responseControllerIcon = headerStatus.sideBarOpen?barIcon:closeIcon;
	
	function onSidebarToggle() {


		setHeaderStatus(perv=>{

			perv.sideBarOpen = !perv.sideBarOpen;

			return {...perv};
		})



	}	

	function sidebarToggle(show=true) {
		console.log("tog",show)
		document.querySelector(".Sidebar")?.classList?.toggle?.("active",!!show)


	}
	sidebarToggle(headerStatus.sideBarOpen);

	return (
		<header>

			<nav>
				
				<div className="nav-actions">
					
					<span className="sidebar-controller">
						<HeaderButton text={responseControllerIcon} onClick={onSidebarToggle}/>
					</span>

					<div style={{gap:"10px"}} className={ "action-items"}>
						<HeaderButton style={{color:"var(--color-theme-2)"}} text="نظر سنجی سازمان تنظیم" />
						<HeaderButton style={{background:"#007cb9"}} text="ثبت نام ADSL" />
						<HeaderButton active={true} text="ورود به سامانه" />
					</div>


				</div>

				<div className="site-short-info">
					<div className="short-info">
						<div className="short-info-1">
							<p>
								سامانه مدیریت اینترنت مشتریان شرکت مخابرات ایران
							</p>
							<p>
								دارای مجوز به شماره ۱۰۰/۱۱۰۰ از سازمان تنظیم مقررات و ارتباطات رادیویی
							</p>	
						</div>
						<div className="short-info-2">
							<p>
								شرکت مخابرات ایران
							</p>
							<p>
										
							سامانه مدیریت اینترنت مشتریان
							</p>	
						</div>	
					</div>
					<img src="https://adsl.tci.ir/panel/assets/images/logo.png" alt="logo" />
				</div>
			</nav>



		</header>
	)

} 