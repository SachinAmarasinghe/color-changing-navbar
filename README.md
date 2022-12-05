# How I created a Color changing Navbar in React with GSAP

A Navbar is an integral part of a website and it's one of the main elements that a user interacts with frequently. Having a great intuitive Navbar for a website is a must. In this article, I’m going to explain how to make a color changing sticky Navbar which the Navbar will change color when you scroll down the page.

1st of all there are two types of Navbars.

1.  Stationary Navbar — A Navbar that stays on top of the page and moves out of the view when scrolled down.
2.  Sticky Navbar — A Navbar that sticks on top of the page and the page will simply scroll below the Navbar. This is a good Navbar design because it stays visible to the user all the time and the user won't be required to scroll up to access the Navbar in case they need to navigate to another page.

## Setting up React

1st lets start by creating a new React app. For you wizkids who already know this, feel free to skip to next steps and see what I did. For the rest of the curious souls follow along.

You can simply follow the instructions on [React documentation](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) itself or do as below.

    npx create-react-app color-changing-navbar
    cd color-changing-navbar
    npm start

After you run npm start, your browser will open up your React app. Cool! To the next step.

## Creating your components

Let's create your Navbar component that we will be using. I will be creating the below components to ease our development. You can build anything that suits your need.

1.  Navbar component — This will be the navbar that we will be using to style
2.  Hero component
3.  Projects component
4.  About component
5.  Contact component
6.  Layout component — This is to wrap all our children components in the app.js file

        import React from 'react'
        import styles from './Navbar.module.scss'

        const Navbar = () => {
            const NavLinks = [
                { 'name': 'Home', 'link': '#top' },
                { 'name': 'About', 'link': '#about' },
                { 'name': 'Projects', 'link': '#projects' },
                { 'name': 'Contact', 'link': '#contact' },
            ];
            return (
            <nav className={styles.navbar}>
                {NavLinks.map(navlink => { return <a href={navlink.link}>{navlink.name}</a> })}
            </nav>
        )  }
        export default Navbar;

![](https://cdn-images-1.medium.com/max/800/1*cvQZUtxNgpHbyJux61t7rw.png)

The project structure

I have used scoped styles and SASS to style the elements, it helps to structure the project nicely and helps with maintainability as well. If you are used to styling with plain CSS, you’re free to do so.

## Using GSAP — Greensock animation library

To handle our animations, we’ll be using the [GSAP — Greensock](https://greensock.com/gsap/) library. It is a professional animation library with so many tricks up its sleeve. From GSAP we’ll be using their ScrollTrigger function for our task. So basically, what happens is, we can set a Trigger to activate when you scroll. It could be a function callback, toggle a class or run a series of animations.

First let’s install GSAP and import it into our project

    npm install gsap

    import React from "react";
    import { gsap } from "gsap";

After that lets import ScrollTrigger plugin from GSAP and register it

    import { ScrollTrigger } from 'gsap/ScrollTrigger'

Inside your function register the ScrollTrigger plugin to use it

    gsap.registerPlugin(ScrollTrigger)

In the project I have created another component called ‘Layout’ to wrap my other components with the Navbar component. That way I can keep my App.js clean. We’ll be writing the ScrollTrigger code inside that Layout.js component.

First, I imported my section components to the Layout.js file so that I can use them.

    import Hero from '../Sections/Hero/Hero'
    import About from '../Sections/About/About'
    import Projects from '../Sections/Projects/Projects'
    import Contact from '../Sections/Contact/Contact'

After that I’ll need to create references for those sections in order to use them in our scroll trigger. For that I used React.fowardRef(), this is called [Forwarding Refs](https://reactjs.org/docs/forwarding-refs.html). I did it like shown below

    import React from 'react';
    import styles from './Hero.module.scss'

    const Hero = React.forwardRef((props, ref) => {
        return (
            <div ref={ref} id='Hero' className={styles.container}>This is Hero section. </div>
        )
    })

    export default Hero;

After adding forwarding refs to all my section components, I created references in Layout.js to use them

    const heroRef = useRef();
    const aboutRef = useRef();
    const projectsRef = useRef();
    const contactRef = useRef();
    const navbarRef = useRef();

As you can see, I did the same for Navbar as well, since it's also a component.

After that I created a ScrollTrigger instance. A single Scroll Trigger can be created like

    ScrollTrigger.create(
        {
            start: "top top",
            end: "bottom bottom",
            markers: true,
            trigger: "#Hero",
            toggleClass: {
                className: "addColor",
                targets: "#Navbar"
            }
        }
    )

Breaking down the code above,

**start** — Where should the animation start from; 1st value is for the trigger element and 2nd value is for the viewport. So, in this case we’re telling the trigger to start from top of our element when it crosses the top of viewport.

**end**— Where the animation should end. In this case, to end it when the bottom of our trigger crosses the bottom of the viewport.

**markers** — Markers can be set when you’re testing to see where the start and end points are. You can set them to false when going live.

**trigger** — The trigger element. When this element crosses/intersect with set markers, it will send a trigger.

**toggleClass** — Here we’re toggling a class in our Navbar element. Instead of toggling a class you can have a function callback too.

> You can read all the available options and official documentation from [here](https://greensock.com/docs/v3/Plugins/ScrollTrigger).

The final code with references to our imported components paired with the Scrolltrigger looked like below.

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

In my code I created multiple instances of the ScrollTrigger with trigger options taken from my “triggers” array. So, in the above code I’m toggling a class in the Navbar that will change its color. I’ve got those color classes defined in my Layout.module.scss, but you can define them in your individual component stylesheets too.

    .heroColorClass {
      background-color: #faf9f9;
    }
    .aboutColorClass {
      background-color: #93e45c;
    }
    .projectsColorClass {
      background-color: #40cd7c;
    }
    .contactColorClass {
      background-color: #8c75b4;
    }

Well, now you can run your project and see. Your navbar will change its color when intersecting with different sections. This is highly useful when you want your sticky navbar to blend in with different colored sections in your site.

![](https://cdn-images-1.medium.com/max/800/1*O0GX-zUOAUPvX_1MDCCoeQ.gif)

Color changing Navbar

## Github & Feedback

You can find the code and the project from the Github link here. Feel free to use the code in any way you see fit and improve anything that I have missed. I’m also pretty new to GSAP and its vast array of capabilities. And I always value feedback on improvements to this simple piece of code.

Cheers and happy coding!
