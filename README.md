# How I created a Color changing Navbar in React with GSAP

A Navbar is an integral part of a website and it's one of the main elements that a user interacts with frequently. Having a great intuitive Navbar for a website is a must. In this article, I'm going to explain how to make a color changing sticky Navbar which the Navbar will change color when you scroll down the page.

##### 1st of all there are two types of Navbars.

1. Stationary Navbar - A Navbar that stays on top of the page and moves out of the view when scrolled down.
2. Sticky Navbar - A Navbar that sticks on top of the page and the page will simply scroll below the Navbar. This is a good Navbar design because it stays visible to the user all the time and the user won't be required to scroll up to access the Navbar in case they need to navigate to another page.

# Setting up React

1st lets start by creating a new React app. For you wizkids who already know this, feel free to skip to next steps and see what I did. For the rest of the curious souls follow along.
You can simply follow the instructions on React documentation itself or do as below.

    npx create-react-app color-changing-navbar
    cd color-changing-navbar
    npm start

After you run npm start, your browser will open up your React app. Cool! To the next step.
