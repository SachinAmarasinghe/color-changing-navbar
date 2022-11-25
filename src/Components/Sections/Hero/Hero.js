import React from 'react';
import styles from './Hero.module.scss'

const Hero = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} id='Hero' className={styles.container}>This is Hero section. </div>
    )
})

export default Hero;