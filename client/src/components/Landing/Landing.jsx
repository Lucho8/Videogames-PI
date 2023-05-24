import Styles from './Landing.module.css';


const Landing = () => {
    return (
        <div className={Styles.background}>
            <div className={Styles.container}>
            <header className={Styles.showcase}>
                <h1>Welcome To My Videogames APP</h1>
            </header>
            <div className={Styles.content}>
                Here you will find Info about a variety of Videogames
            </div>
            <a href="/home" className={Styles.btn}>
                Go to Home
            </a>
        </div>
        </div>
        
    );
};

export default Landing