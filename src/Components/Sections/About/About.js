import React from 'react'
import styles from './About.module.scss'

const About = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} id='About' className={styles.container}>
            This is about section
        </div>
    )
})

export default About;