class MQ_Slider {

	constructor(...argv) {

		this.init(...argv)

	}
	init({rootNode,autoTimer=true,timerDelay=10000}) {

		this.rootNode = rootNode; 
		this.currentIndex = 0;
		this.going = false;
		this.autoTimer = autoTimer;
		this.timerDelay = timerDelay;
		this.initEventListners()

	}
	initEventListners() {
		this.rootNode.querySelector(".go-left").onclick = ()=>{
			this.go("left");
		}; 

		this.rootNode.querySelector(".go-right").onclick = ()=>{
			this.go("right");
		};


		const slides = this.rootNode.querySelector(".slides");

		slides.onmouseenter = (e)=>this.stopTimer();
		slides.onmousedown = (e)=>this.ontouch(e);
		slides.ontouchstart = (e)=>this.ontouch(e);
		


		window.addEventListener("mouseup",(e)=>this.onmoved(e));
		window.addEventListener("blur",(e)=>{this.stopTimer();this.onmoved(e)});
		window.addEventListener("focus",(e)=>{this.runTimer();});
		
		slides.ontouchend = (e)=>{this.runTimer();this.onmoved(e);};
		slides.onmouseleave = (e)=>{this.runTimer(); this.onmoved(e);};
		slides.ontouchcancel = (e)=>this.onmoved(e);

		slides.onmousemove = (e)=>this.onmovement(e);
		slides.ontouchmove = (e)=>this.onmovement(e);

		this.runTimer()
	}
	runTimer() {
		if(!this.autoTimer) return;
		
		this.timer = setInterval(()=>{
			this.go("right")

		},this.timerDelay);



	}
	stopTimer() {
		clearInterval(this.timer);
	}
	ontouch(e) {
		if(this.isTouching) return;
		this.stopTimer();
		this.isTouching = true;
		
		const [x,y] = [

			e.clientX ?? e.touches[0].clientX ?? e.targetTouches[0].clientX ,
			e.clientY ?? e.touches[0].clientY ?? e.targetTouches[0].clientY 


		]

		this.pointData = {
			start:{
				x,
				y
			}
		}

		this.allSlides.forEach(e=>{
			this.setTransition(e,"off");
			this.setTransition(e,"off","long");
		})

	}
	onmovement(e) {

		if(!this.isTouching) 
			return this.pointData&&this.clearLastPointData();
		if(e.type!="touchmove"&&!e.buttons) return this.onmoved(e)
		this.isMoved = true;
		const [x,y] = [

			e.clientX ?? e.touches[0].clientX ?? e.targetTouches[0].clientX ,
			e.clientY ?? e.touches[0].clientY ?? e.targetTouches[0].clientY 


		]
		this.pointData = {
			...this.pointData,
			move:{
				x,
				y
			}
		}

		// calculation
		const {start,move,lastMove}= this.pointData
		const isGoingLeft = start.x<move.x;


		const nextActiveIndex = this.getIndex(isGoingLeft ? (this.currentIndex - 1):(this.currentIndex + 1) );
		const nextActiveElm = this.allSlides[nextActiveIndex];
		const activeElm = this.activeSlide;

		this.allSlides.forEach((e,key)=>{

			if(e.isSameNode(activeElm)) {

				return this.setLayer(e,0);

			} else if(e.isSameNode(nextActiveElm)) {
				return this.setLayer(e,-1);

			}
			
			return this.setLayer(e,-1*(key+2));

		});

		this.setHalf(nextActiveElm,isGoingLeft? "left":"right");

		const slideWidth = this.rootNode.querySelector(".slides").clientWidth;

		const deltaX =(lastMove?lastMove.x:start.x ) - move.x;
		const deltaXPercentFromHalf = (start.x - move.x) * 50 / slideWidth;

		const deltaXPercent = deltaX * 100 / slideWidth;

		const nextActiveElmentCurrentXposition = this.getTransformPosition(nextActiveElm);
		const currentActiveElmentCurrentXposition = this.getTransformPosition(activeElm);

		let nextTransformX = nextActiveElmentCurrentXposition - (deltaXPercentFromHalf);
		
		let currentTransformX = currentActiveElmentCurrentXposition - deltaXPercent;




		// if(isGoingLeft) {

		// 	nextTransformX = nextActiveElmentCurrentXposition + deltaXPercentFromHalf;
		//    currentTransformX =  currentActiveElmentCurrentXposition + deltaXPercent;			
		// } else {
		// 	nextTransformX = nextActiveElmentCurrentXposition - deltaXPercentFromHalf;
		//    currentTransformX =  currentActiveElmentCurrentXposition - deltaXPercent;			
		// }

		this.setTransformX(nextActiveElm,nextTransformX+"%")
		this.setTransformX(activeElm,currentTransformX+"%")
		this.pointData = {
			...this.pointData,
			lastMove:{
				x,
				y
			}
		}


	}
	getTransformPosition(elm) {
		let transformNumber = elm.style.transform.match(/((-)?\d+(\.\d+)?)/g);
		transformNumber = transformNumber?transformNumber[1]:0;
		return +transformNumber;
	}

	onmoved(e) {
		if(!this.isTouching||!this.isMoved) return this.pointData && this.clearLastPointData();


		const {start,move}= this.pointData;
		const isGoingLeft = start.x<move.x;
		const slideWidth = this.rootNode.querySelector(".slides").clientWidth;

		const nextActiveIndex = this.getIndex(isGoingLeft ? (this.currentIndex - 1):(this.currentIndex + 1) );
		const nextActiveElm = this.allSlides[nextActiveIndex];
		const activeElm = this.activeSlide;

		const deltaX = (start.x - move.x);
		const deltaXPercent = deltaX * 100 / slideWidth;
		if(isGoingLeft) {
			if(Math.abs(deltaXPercent) > 20) {
				this.go("left",false);
			} else {
				this.setTransition(activeElm,"on");
				this.setTransition(nextActiveElm,"on","long");

				this.setTransformX(activeElm,"0%");
				this.setTransformX(nextActiveElm,"-100%");

			}
		} else  {

			if(Math.abs(deltaXPercent) > 20) {
				this.go("right",false);
			} else {
				this.setTransition(activeElm,"on");
				this.setTransition(nextActiveElm,"on","long");

				this.setTransformX(activeElm,"0%");
				this.setTransformX(nextActiveElm,"100%");

			}
		}
		this.clearLastPointData();

	}
	clearLastPointData() {
		this.isTouching = false;
		this.pointData = null;
		this.isMoved = false;
		this.going = false;

	}
	get activeSlide() {
		// the active one or the first one
		return this.rootNode.querySelector(".slide.active")||this.rootNode.querySelector(".slide");
	}
	get allSlides() {
		return[...document.querySelectorAll(".slide")];
	}
	getIndex(index) {
		const allSlidesLen = this.allSlides.length;
		return index<0? allSlidesLen - Math.abs(index % allSlidesLen): index % allSlidesLen;
	}
	get currentIndex() {

		const activeSlide = this.rootNode.querySelector(".slide.active");
		if(!activeSlide) return 0;
		const index = this.allSlides.findIndex(e=>e.isSameNode(activeSlide));
		if(index+1) return index;
		return 0;

	}
	set currentIndex(index) {
		const newIndex = this.getIndex(index);

		this.allSlides[this.currentIndex].classList.toggle("active",false);
		this.allSlides[newIndex].classList.toggle("active",true);

		return newIndex;
	}

	go(where="right",join=true) {
		if(this.going || this.allSlides.length<=1) return 1;
		this.going =true;
		const left = where == "left";


		const nextActiveIndex = this.getIndex(left ? (this.currentIndex - 1):(this.currentIndex + 1) );
		const nextActiveElm = this.allSlides[nextActiveIndex];
		const activeElm = this.activeSlide;
		join&&this.setHalf(nextActiveElm,left? "left":"right");
		this.allSlides.forEach((e,key)=>{

			if(e.isSameNode(activeElm)) {

				return this.setLayer(e,0);

			} else if(e.isSameNode(nextActiveElm)) {
				return this.setLayer(e,-1);

			}
			
			return this.setLayer(e,-1*(key+2));

		});


		activeElm.ontransitionend = ()=>{
			 this.onSlidePassed.bind(this,{
			 		perActiveElm:activeElm,
			 		activeElm:nextActiveElm,
			 		activeIndex:nextActiveIndex,
		
			 	})()
			};

		setTimeout(()=>{
			this.setTransition(nextActiveElm,"on","long");
			this.setTransition(activeElm,"on");
			this.setTransformX(nextActiveElm,"0%");
			this.setTransformX(activeElm,(left?"":"-")+"100%");
		})


	}

	setLayer(elm,layer) {

		elm.style.zIndex = layer+"";
	}
	setTransition(elm,status,long) {

		elm.classList.toggle("slide-transition"+(long=="long"?"-long":""),status.toLowerCase().trim()==="on");
	}

	// remember you should set the sign
	setTransformX(elm,x) {

		elm.style.transform = `translate3d(${x},0px,0px)`;

	}

	setHalf(elm,half) {

		this.setTransformX(elm,(half=="left"?-1:1)*50 +"%");

	}

	onSlidePassed({
		perActiveElm ,
		activeElm,
		activeIndex
	}) {
			perActiveElm.ontransitionend = null;
			// disable transition
			this.setTransition(perActiveElm,"off");
			this.setTransition(activeElm,"off","long");

			this.setTransformX(perActiveElm,"0%");

			this.allSlides.forEach((e,key)=>{

				if(!e.isSameNode(activeElm)) {

					this.setLayer(e,-1*(key+2));
				}

			});
			// this previous active elm
			
			// this current active elm
			this.setLayer(activeElm,0);

			// set currentIndex
			this.currentIndex = activeIndex;
			this.clearLastPointData();

	}
	async goLeft() {

	

	}
	goRight() {
		const nextActiveElm = this.getIndex(this.currentIndex+1);


	}


}
const slider = new MQ_Slider({rootNode:document.querySelector(".Slider")});
