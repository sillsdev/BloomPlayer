/// <reference path="../typings/index.d.ts" />

import {SetupLayout} from "./layout";
import {SetupAnimation} from "./animation";
import {SetupMusic} from "./music";
import {SetupNarration, SetupNarrationEvents} from "./narration";
import Controls from "./controls";
import {Carousel} from "./carousel";
import {Scale} from "./layout";
//import {PageVisible} from "./carousel";

function attach() {
    SetupLayout();

    setUpDomForPlaying();

    SetupNarrationEvents();  // very early, defines events others subscribe to.
    SetupAnimation();
    SetupMusic();
    SetupNarration();

    (<any> window).carousel.showFirstPage();

    //nav.GotoFirstPage(); // now go to first page again so that all the fancy stuff gets triggered

    //commented out because we are getting these events even if there is no narration.
    // PageNarrationComplete.subscribe(page => {
    //     if (page === nav.currentPage()) {
    //          GoNextPage.raise();
    //     }
    // });
}

function setUpDomForPlaying() {
    document.body.insertAdjacentHTML("afterbegin", "<div id='root'></div>");
    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML("afterbegin", "<div id='scaler'></div>");
    const scalerElement = document.getElementById("scaler");

    window.setTimeout( () => scalerElement.style.transform =  "scale(" + Scale() + ")");

    (<any> window).carousel = new Carousel(scalerElement);
    new Controls().show( (<any> window).carousel);
}

document.addEventListener("DOMContentLoaded", attach, false);
