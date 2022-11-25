import { React, useRef, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import styles from './Layout.module.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../Sections/Hero/Hero'
import About from '../Sections/About/About'
import Projects from '../Sections/Projects/Projects'
import Contact from '../Sections/Contact/Contact'

const Layout = () => {
    gsap.registerPlugin(ScrollTrigger)
    const heroRef = useRef();
    const aboutRef = useRef();
    const projectsRef = useRef();
    const contactRef = useRef();
    const navbarRef = useRef();

    useEffect(() => {
        const triggers = [
            { "start": "top 80px", "end": "bottom 80px", "class": styles.heroColorClass, "trigger": heroRef.current, "target": navbarRef.current },
            { "start": "top 80px", "end": "bottom 80px", "class": styles.aboutColorClass, "trigger": aboutRef.current, "target": navbarRef.current },
            { "start": "top 80px", "end": "bottom 80px", "class": styles.projectsColorClass, "trigger": projectsRef.current, "target": navbarRef.current },
            { "start": "top 80px", "end": "bottom 80px", "class": styles.contactColorClass, "trigger": contactRef.current, "target": navbarRef.current },
        ]

        triggers.forEach((trigger) => {
            ScrollTrigger.create(
                {
                    start: trigger.start,
                    end: trigger.end,
                    markers: true,
                    trigger: trigger.trigger,
                    toggleClass: {
                        className: trigger.class,
                        targets: trigger.target
                    }
                }
            )
        })
    }, [])
    return (
        <>
            <Navbar ref={navbarRef} />
            <Hero ref={heroRef} />
            <About ref={aboutRef} />
            <Projects ref={projectsRef} />
            <Contact ref={contactRef} />
        </>
    )
}

export default Layout