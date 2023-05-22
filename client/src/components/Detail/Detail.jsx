import React, { useState, useEffect } from "react";
import styles from "./Detail.module.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Detail = () => {
    const { id } = useParams();
    const [videogameDetail, setVideogameDetail] = useState({});

    useEffect(()=>{
        const fetchData  = async () => {
            try {
                const { data } = await axios(`http://localhost:3001/videogames/${id}`);
                if (data.name) {
                    setVideogameDetail(data);
                } else {
                    window.alert('There is no videogame with that ID');
                }
            } catch (error) {
                console.log(error);
                }
        }
        fetchData ();
        return setVideogameDetail({})
    },[id])



    return(
      <div className={styles.container}>
        <NavLink to='/home'><button>Home</button></NavLink>
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>{videogameDetail.name}</h1>
      <img src={videogameDetail.image} alt={videogameDetail.name} className={styles.image} />
    </div>
    <div className={styles.descriptionContainer}>
      <h2 className={styles.sectionTitle}>Description</h2>
      <p>{videogameDetail.description}</p>
    </div>
    <div className={styles.infoContainer}>
      <div className={styles.infoItem}>
        <h2 className={styles.sectionTitle}>Release Date</h2>
        <p>{videogameDetail.releaseDate}</p>
      </div>
      <div className={styles.infoItem}>
        <h2 className={styles.sectionTitle}>Platforms</h2>
        <p>{videogameDetail.platforms && videogameDetail.platforms.join(', ')}</p>
      </div>
      <div className={styles.infoItem}>
        <h2 className={styles.sectionTitle}>Genres</h2>
        <p>{videogameDetail.genres && videogameDetail.genres.join(', ')}</p>
      </div>
      <div className={styles.infoItem}>
        <h2 className={styles.sectionTitle}>Rating</h2>
        <div className={styles.ratingContainer}>
          <span className={styles.rating}>{videogameDetail.rating}</span>
          <span className={styles.star}>⭐</span>
        </div>
      </div>
    </div>
  </div>
    )
}

export default Detail