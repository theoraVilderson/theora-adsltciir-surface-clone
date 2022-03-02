import React  ,{useState}from "react";



export default function AuthForm() {


	const [formInfo,setFormInfo] = useState({


		rememberPasswordHoverd:false,
		quickPayHoverd:false,

	});


	function onHover(e) {

		let hoverState = false;
		let hoverName = e.target.dataset.hovername;
		if(e.type =="mouseenter") {
			hoverState= true;
		} else if(e.type =="mouseleave") {
			hoverState= false;
		}
		setFormInfo((perv)=>({...perv,...{[hoverName+"Hoverd"]:hoverState}}));

	}





	return (
		<div className="AuthForm">

			<h1>
				ورود به سامانه
			</h1>
			<hr style={{borderColor:"rgba(0, 0, 0, 0.08)",margin:"0px"} } />
			<form action="/auth">
				<div className="form-item warn">
					نام کاربری : شماره تلفن ثابت بهمراه کد شهر بدون صفر
				</div>

				<div className="form-item input-form">
					<input required type="text" name="username" placeholder="نام کاربری"/>
				</div>
				<div className="form-item input-form">
					<input required type="password" name="password" placeholder="گذرواژه"/>
				</div>
				<div className="form-item">
					<div style={{backgroundImage:"url('https://adsl.tci.ir/panel/captcha/?r=1646201822')"}} className="captchaImage" onClick={(e)=>{
						const perv = e.target.style.backgroundImage;

						e.target.style.backgroundImage = null;
						e.target.style.backgroundImage = perv;
					}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402c-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83c-10.28 8.396-11.78 23.5-3.375 33.74c4.719 5.806 11.62 8.802 18.56 8.802c5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1S435.1 200.4 412.6 182zM473.1 108.2c-10.22-8.334-25.34-6.898-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74c4.75 5.775 11.62 8.771 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zM534.4 33.4c-10.22-8.334-25.34-6.867-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zM301.2 34.98c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8C272.7 477 280.3 479.8 288 479.8c4.438 0 8.959-.9314 13.16-2.835C312.7 471.8 320 460.4 320 447.9V64.12C320 51.55 312.7 40.13 301.2 34.98z"/></svg>
					</div>
				</div>
				<div className="form-item input-form">
					<input type="number" name="captcha" placeholder="کد امنیتی" />
				</div>
				<button className="form-item" type="submit">
					ورود به سامانه

				</button>
			</form>
			<hr style={{borderColor:"rgba(0, 0, 0, 0.08)",margin:"0px"} } />
			<div className="form-item remember-box">
				<a href="#" onMouseEnter={onHover} onMouseLeave={onHover} data-hovername='rememberPassword' className={"textDrap "+(formInfo.rememberPasswordHoverd?"textDrap-active":"")+" textDrap-top"} data-textdrap="رمز عبور خود را فراموش کرده ام">رمز عبور خود را فراموش کرده ام</a>
				<a href="#"  onMouseEnter={onHover} onMouseLeave={onHover} data-hovername='quickPay' className={"textDrap "+(formInfo.quickPayHoverd?"textDrap-active":"")+" textDrap-bottom"} data-textdrap="بدون نیاز به کلمه عبور">شارژ سریع</a>
			</div>

		</div>

	)

} 