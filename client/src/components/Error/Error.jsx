import React from 'react';
import styles from './Error.module.css';

const Error = () => {
    return (
        <body className={styles.body}>
        <section className={styles.notFound}>
            <div className={styles.img}>
            <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage" />
            <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly" />
            </div>
            <div className={styles.text}>
            <h1>404</h1>
            <h2>PAGE NOT FOUND</h2>
            <h3>BACK TO HOME?</h3>
            <a href="/home" >YES</a>
            <a href="https://www.youtube.com/watch?v=G3AfIvJBcGo">NO</a>
            </div>
        </section>
        </body>
    );
}

export default Error;