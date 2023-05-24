import React from 'react';
import styles from'./Loading.module.css';
import gifbottom from './Joker.gif'
import gifTop from './Hat.gif'

const quotes = [
    "I've struggled a long time with survivin', but no matter what you have to find something to fight for. - Joel Miller, The Last of Us",
    "Do you like hurting other people? - Hotline Miami",
    "Praise the sun! - Solaire, Dark Souls",
    "The Right Man In The Wrong Place Can Make All The Difference In The World. - G-man, Half Life",
    "It's Dangerous To Go Alone! Take This. - Old Man, The Legend Of Zelda",
    "Finish Him! - Mortal Kombat",
    "I Survived Because The Fire Inside Me Burned Brighter Than The Fire Around Me. - Joshua Graham, Fallout: New Vegas",
    "We are More Ghosts Than People. - Arthur Morgan, Red Dead Redemption 2",
    "All We Had To Do, Was Follow The Damn Train, CJ! - Big Smoke, Grand Theft Auto: San Andreas",
    "Thank You Mario! But Our Princess Is In Another Castle! - Toad, Super Mario Bros",
    "Did I Ever Tell You The Definition Of Insanity? - Vaas, Far Cry 3",
    "Where is Everyone Going? Bingo? - Leon S. Kennedy, Resident Evil 4",
    ];

const Loading = () => {
    return ( 
        <div className={styles.animateTextBox}>
            <img src={gifTop} className={styles.gifTop} alt="Loading GIF" />
                <div className={styles.loaderBox}>
                <div className={`${styles.animateText} text-center`}>
                    <div>Loading Videogames...</div>
                    <div>{quotes[Math.floor(Math.random() * quotes.length)]}</div>
                    <div>{quotes[Math.floor(Math.random() * quotes.length)]}</div>
                    <div>{quotes[Math.floor(Math.random() * quotes.length)]}</div>
                    <div>{quotes[Math.floor(Math.random() * quotes.length)]}</div>
                </div>
                <div className={styles.spinnerDots}>
                    <div className={styles.dots1}></div>
                    <div className={styles.dots2}></div>
                    <div className={styles.dots3}></div>
                    <div className={styles.dots1}></div>
                    <div className={styles.dots2}></div>
                    
                </div>
                
                </div>
            <img src={gifbottom} className={styles.gifBottom} alt="Loading GIF" />
        </div>
    );
};

export default Loading;