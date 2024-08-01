import React, { useEffect, useState } from 'react'
import styles from './Content.module.css'
import { IoSend } from "react-icons/io5";
import { getNotes, saveNote } from '../../apis/subject';
import { GoDotFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";


const Content = ({pageContent}) => {
    const [subjectNotes , setSubjectNotes] = useState([])
    const [notes , setNotes] = useState({
        note : "",
        subject : ""
    })

  const handleNote = async() => {
    if(notes){
        console.log(notes)
        const res = await saveNote(notes);
        fetchNotes()
    }
    setNotes((prev)=>({...prev , note : " "}))
  }

  const fetchNotes = async() => {
   const res = await getNotes();
   if(res?.data){
    const catWiseData = res?.data?.data?.filter((cur)=>cur.subject === pageContent.subject)
    setSubjectNotes(catWiseData)
   }
  }


    useEffect(()=>{
        fetchNotes()
        setNotes((prev)=>({...prev , subject : pageContent?.subject}))
    },[pageContent])

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

    const getInitials = (subName) =>{
        const word = subName.split(' ');
        const firstInitial = word[0][0].toUpperCase();
        if(word.length < 2){
         return `${firstInitial}`
        }
         else{
        const secondInitial = word[1][0].toUpperCase();
        return `${firstInitial}${secondInitial}`
        }
     }




  return (
    <section className={styles.section}>
        <div className={styles.headerDiv}>
            <div  className={styles.header}>
            <div style={{display:'flex' , alignItems:'center', gap:'0.5rem'}}>   
            <div className={styles.icon} style={{background:`${pageContent?.color}`}}>{getInitials(pageContent?.subject)}</div>
            <h1>{pageContent?.subject}</h1>
            </div>
            <label>
            <input placeholder='Search...'/>
                <FaSearch />
            </label>
            </div>
        </div>
        <div className={styles.content}>   
          {subjectNotes.map((cur)=>{
            return(
           <div className={styles.note}>
            <p style={{color:'black'}}>{cur?.note}</p>
            <div className={styles.timestamps}>
            <div className={styles.time}>{formatDate(cur.createdAt)} <GoDotFill /> {formatTime(cur.createdAt)}</div>
            </div>
            </div>
         ) })}
        </div>
        <div className={styles.type}>
         <textarea placeholder='Type here' value={notes.note} onChange={(e)=>setNotes((prev)=>({...prev , note : e.target.value}))}/>
          {notes.note.length > 0 &&  
         <button className={styles.send}><IoSend onClick={()=>handleNote()} /></button>}
        </div>
    </section>
  )
}

export default Content