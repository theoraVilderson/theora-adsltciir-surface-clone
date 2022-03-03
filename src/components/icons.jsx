import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'


 function getIcon(icon="",perfix="fa") {


	const endIconPerfix = icon.search(/[A-Z]/);

	perfix = endIconPerfix+1?icon.slice(0,endIconPerfix):perfix;
	icon = (endIconPerfix+1?icon.slice(endIconPerfix):icon);
	icon = icon.split("-").reduce((perStr,str,key,arr)=>{
		if(key) {
			str = `${str.slice(0,1).toUpperCase()}${str.slice(1)}`
		}
		return perStr+str;
	});

	const fullIconName = `${perfix}${icon.slice(0,1).toUpperCase()}${icon.slice(1)}`
	const fontIcon = icons[fullIconName];
	if(!fontIcon) return "";
	fontIcon.perfix = perfix;

	return fontIcon;


}

export {FontAwesomeIcon,getIcon};
