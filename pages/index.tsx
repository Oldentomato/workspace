import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layout";
import Hero from "../components/home/section_1/hero";
import Skill from "../components/home/section_2/skill"
import AnimationSkill from "../components/home/section_2/animation_skill"
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import {useEffect} from 'react'

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(()=>{
    let sizes = {
      width : window.innerWidth,
      height : window.innerHeight
    }

    function handleResize() {
      // Set window width/height to state
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
    }

    let currentSection = 0;
    let scrollY = window.scrollY;

    window.addEventListener("resize", handleResize);
    handleResize();
    window.addEventListener("scroll", ()=>{
        scrollY = window.scrollY;
        const newSection = Math.round(scrollY/sizes.height)
        if(newSection!==currentSection){
          currentSection = newSection;
    
          if(currentSection === 1){
            gsap.fromTo(".skill",
            {
              opacity: 0,
            },
            {
              opacity: 1,
              ease: 'power1.inOut',
              
              scrollTrigger: {
                  trigger: '.skill',
                  start: 'top center',
                  end: '+=200',
                  scrub: true,
              },
            })

            gsap.fromTo(".skillanimation",
            {
              opacity: 0,
              xPercent: 50
            },
            {
              opacity: 1,
              xPercent: 30,
              ease: 'power1.inOut',
              duration: 1,
              
              scrollTrigger: {
                  trigger: '.skillanimation',
                  start: 'top center',
                  end: '+=200',
                  scrub: true,
              },
            })
          }

          else if(currentSection === 2){
            gsap.fromTo(".Activities",
            {
              opacity: 0,
              xPercent: 100
            },
            {
              opacity: 1,
              xPercent: 0,
              ease: 'power1.inOut',
              scrollTrigger: {
                  trigger: '.Activities',
                  start: 'top bottom',
                  end: '+=200',
                  scrub: true,
              },
            })
          }
      }
    });

    return () => ( window.removeEventListener("resize", handleResize));
  },[])





  return (
    <Layout>
      <div className="overflow-hidden">
        <Head>
          <title>PortFolio</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="top-0 left-0 outline-none">
          <section className="flex h-[100vh] relative items-center justify-center text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <Hero />
            </div>
          </section>

          <section className="flex items-center h-[100vh] relative justify-center">
            <div className="skill opacity-0">
              <Skill />
            </div>
            <div className="skillanimation opacity-0">
              <AnimationSkill />
            </div>

          </section>

          <section className="flex items-center h-[100vh] relative justify-center">
            <div className="Activities">
              <h1>TEST2</h1>
            </div>
          </section>
        </div>

      </div>


    </Layout>
  );
}
