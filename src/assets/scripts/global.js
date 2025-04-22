import "./stars.js";
import "./nav.js";

import "@zachleat/details-utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lite-youtube-embed";

gsap.registerPlugin(ScrollTrigger);
gsap.set(".stars", { opacity: 0.6 });

gsap.to(".stars", {
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "top -75%",
    toggleActions: "restart pause reverse pause",
    scrub: true,
  },
  opacity: 0.3,
});
