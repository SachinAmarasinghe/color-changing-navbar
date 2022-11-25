import React from 'react';
import styles from './Projects.module.scss'
const Projects = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} id='Projects' className={styles.container}>This is Projects section. </div>
    )
})

export default Projects;