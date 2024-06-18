const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'), // OK
    smooth: true // OK
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", { // OK
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", { // OK
        y: 0,
        duration: 2,
        ease: Expo.easeInOut,
        stagger: 0.2
    })
    .from("#herofooter", { // OK
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    });
}

function circleSkew() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    let timeout;

    window.addEventListener("mousemove", function(dets) {
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function() {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`; // OK
        }, 100);
    });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function(dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`; // OK
    });
}

circleSkew();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function(elem) {

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(dets) {

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
        });
    });



    elem.addEventListener("mousemove", function(dets) {

        var diff = dets.clientY - elem.getBoundingClientRect().top;
        
        diffrot = dets.clientX-rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX - elem.getBoundingClientRect().left,
            rotate: gsap.utils.clamp(-20, 20, diffrot* 0.5),
        });
    });
});

