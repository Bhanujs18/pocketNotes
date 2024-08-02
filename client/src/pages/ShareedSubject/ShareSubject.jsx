import React, { useEffect, useState } from 'react'
import styles from './ShareSubject.module.css';
import { useParams } from 'react-router-dom';
import { fetchNote, getNotes } from '../../apis/subject';

const ShareSubject = () => {

    const {subject} = useParams()
    const [data , setData] = useState();

    const fetchNoteById = async() => {
          const res = await getNotes();
          if(res?.data?.data){
            const filteredData  = res?.data?.data.filter((cur)=>cur.subject === subject)
            setData(filteredData);
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
      <div className={styles.subject}>
       <h1>Subject : {subject}</h1>
       </div>
       <div className={styles.dataDiv}>
      <div className={styles.data}>
        {data && data?.map((cur)=>(
            <div className={styles.card}>
                <div className={styles.note}>
                    <p>Note : </p>
                    <p>{cur.note}</p>
                    </div>
                <h3>{formatDate(cur.createdAt)} : {formatTime(cur.createdAt)}</h3>
            </div>
        ))}
      </div>
      </div>
    </section>
  )
}

export default ShareSubject