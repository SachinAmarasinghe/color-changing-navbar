import React from 'react';
import styles from './Contact.module.scss'

const Contact = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} id='Contact' className={styles.container}>This is Contact section. </div>
    )
})

export default Contact;