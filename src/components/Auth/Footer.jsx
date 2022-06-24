import React from "react";
import trustLogo from "./trustLogo.png";

export default function Fotter() {
	return (
		<footer>
			<img src={trustLogo} alt="trustLogo" />
			<div>
				<p>
					کلیه حقوق این سامانه متعلق به &nbsp;
					<a
						href="https://www.tci.ir/"
						target="_blank"
						rel="noreferrer"
					>
						شرکت مخابرات ایران
					</a>{" "}
					&nbsp; می باشد.
				</p>
			</div>
		</footer>
	);
}
