import React, { useEffect, useState } from 'react'
import styles from './Share.module.css';
import { useParams } from 'react-router-dom';
import { fetchNote } from '../../apis/subject';

const Share = () => {

    const {id} = useParams()
    const [data , setData] = useState();

    const fetchNoteById = async() => {
          const res = await fetchNote(id);
          if(res?.data?.data){
            setData(res.data.data);
            console.log(res.data.data)
          }
    }

    const formatDate = (noteDate) => {
        let date = new Date(noteDate)
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ]; 
          const mon = date.getMonth();
        const fullday = `${date.getDate()} ${months[mon]} ${date.getFullYear()}`
        return fullday;
    }

    const formatTime = (noteTime) => {
        let date = new Date(noteTime)
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    useEffect(()=>{
     fetchNoteById();
    },[])

  return (
    <section>
      <div className={styles.icon}>
        <h1>Pocket Notes</h1>
      </div>

      <div className={styles.data}>
        {data && data?.map((cur)=>(
            <div className={styles.card}>
                <h2>Subject : {cur?.subject}</h2>
                <div className={styles.note}>
                    <p>Note : </p>
                    <p>{cur.note}</p>
                    </div>
                <h3>Created : {formatDate(cur.createdAt)} : {formatTime(cur.createdAt)}</h3>
            </div>
        ))}
      </div>
    </section>
  )
}

export default Share