import { useEffect, useState, useRef } from 'react' // Added useRef
import './App.css'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const imgs = Array.from(document.images);
    Promise.all(imgs.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
        });
    })).then(() => {
        ScrollTrigger.refresh();

        gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                setIsLoading(false);
            }
        });
    });

  }, []);

  useGSAP(() => {
    const side1_col = document.getElementsByClassName('side-1')[0];
    const side2_col = document.getElementsByClassName('side-2')[0];
    const side3_col = document.getElementsByClassName('side-3')[0];
    const side4_col = document.getElementsByClassName('side-4')[0];
    const main_img = document.getElementsByClassName('scaling-img')[0];

    gsap.set(main_img, { transformOrigin: "center center", force3d: true, scale: 1 });

    gsap.to(side1_col, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    gsap.to(side2_col, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    gsap.to(side3_col, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    gsap.to(side4_col, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    const tl = gsap.timeline({});
    tl.to(".gallery-wrapper", {
      scale: 4.65,
      ease: "none",
      scrollTrigger: {
        trigger: ".ws",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    tl.set(main_img, { transformOrigin: "center center", force3d: true});

    tl.to(main_img, {
      scale: 3.65 * 1.4,
      ease: "none",
      scrollTrigger: {
        trigger: ".ws",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    }, 0);

    tl.to(".scaling-img-wrapper", {
      aspectRatio: "16 / 9",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".ws",
        start: "top bottom",
        end: "center center",
        scrub: true,
      }
    }, 0);
  })

  return (
    <>
      {isLoading && (
        <div ref={loaderRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-red-600 text-white w-screen h-screen">
            <h1 className="text-4xl font-bold uppercase tracking-widest">Loading...</h1>
        </div>
      )}

      <section className="fixed top-0 left-0 w-full h-screen -z-30 flex items-center justify-center overflow-hidden transform-[scale(1.25)]">
        <div className="gallery-wrapper flex flex-row gap-10 bg-black">
          <div className="flex flex-col will-change-transform gap-10 side-1">
            <img src="/images/pin-8.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
            <img src="/images/pin-2.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
            <img src="/images/pin-3.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
          </div>
          <div className="flex flex-col will-change-transform gap-10 side-2">
            <img src="/images/pin-4.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
            <img src="/images/pin-5.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
            <img src="/images/pin-6.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
          </div>
          <div className="flex flex-col will-change-transform gap-10 main z-50">
            <img src="/images/pin-7.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
            <div className="w-50.5 h-50.5 bg-transparent"></div>
            <img src="/images/pin-9.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
          </div>
          <div className="flex flex-col will-change-transform gap-10 side-3 z-10">
            <img src="/images/pin-8.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
            <img src="/images/pin-4.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
            <img src="/images/pin-3.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
          </div>
          <div className="flex flex-col will-change-transform gap-10 side-4 z-10">
            <img src="/images/pin-6.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
            <img src="/images/pin-5.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
            <img src="/images/pin-2.jpg" alt="Image 1" className="img overflow-hidden w-50.5 h-50.5 object-cover" />
          </div>
        </div>
      </section>

      <div className="scaling-img-wrapper w-70 h-70 aspect-square flex items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
          <img 
          src="/images/image.png" 
          alt="Hero" 
          className="scaling-img object-cover will-change-auto shadow-2xl" 
        />
      </div>

      <div className="container z-50 h-full w-screen m-0 p-0 overflow-x-hidden min-w-full">
          <div className="hero z-50 h-screen w-screen flex items-center justify-center">
            <div className="hero-img z-50 overflow-hidden w-full h-full">
                <img className='w-full h-full object-cover z-50' src="/images/hero.png" alt="Hero" />
            </div>
        </div>
        <div className="intro z-50 bg-[#dcd4c0] h-screen w-screen flex flex-col will-change-transform gap-10 items-center justify-items-center">
          <h1 className="text-8xl font-boska text-red-700 mx-auto my-auto">unbounded</h1>
           <h1 className="text-8xl font-boska text-red-700 mx-auto">sprouts</h1>
            <h1 className="text-8xl font-boska text-red-700 mx-auto">007</h1>
        </div>
        <div className="ws bg-transparent h-[600vh] w-screen"></div>
        <div className="outro z-50 bg-[#dcd4c0] h-screen w-screen flex flex-col will-change-transform gap-10 items-center justify-items-center">
            <h1 className="text-[20em] absolute bottom-0 font-britney text-red-700 -translate-x-20">flowers</h1>
        </div>
        <div className="footer"></div>
      </div>
    </>
  )
}

export default App