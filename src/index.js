
import React, { Component, Fragment, Suspense } from "react";
import { render } from 'react-dom';
import style from "./style.scss"

class App extends Component {
	render() {
		return (
            <div className={style.container}>
                <div className={style.image}>
                    <img src="./assets/images/hello.png" alt="hello"/>
                </div>
                <h3 className={style.title}>You can start work!!!</h3>
            </div>
		);
	}
}



render(
	<App />,
	document.querySelector('#app')
)