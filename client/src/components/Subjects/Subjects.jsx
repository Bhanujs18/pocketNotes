import React, { useEffect, useState } from 'react'
import styles from './Subjects.module.css'
import { saveSubject } from '../../apis/subject'
import { FaShareAlt } from "react-icons/fa";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BarLoader } from 'react-spinners'

const Subjects = ({setSHowContent , mainData , setCategory}) => {
    const [addSubject , setAddSubject] = useState(false)
    const [color , setColor] = useState("#001F8B")
    const [subjects , setSubjects] = useState(mainData)
    const [search , setSearch] = useState();
    const [currentSubject , setCurrentSubject] = useState();
    const [data , setData] = useState({
        subjectName : "",
        subjectColor : "",
        messages : []})

    const handleSubject = async() => {
        setSubjects((prev)=>{
            return [...prev , data]
        }) 
        const res = await saveSubject(data);
        if(res?.data){
        setSubjects(res?.data?.data)
        setData(res?.data?.data)
        }
        setCategory(currentSubject)
        setAddSubject(false)
    }

    const getInitials = (subName) =>{
        if(subName){
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
    else{
        return ""
    }
    }
       
   const shareSubject = async(name) => {
    await navigator.clipboard.writeText(`https://pocketnotes-bhanu.netlify.app/sharedSubject/${name}`);
    // toast.success('🦄Link Coppied!');
   }

    useEffect(()=>{
       setData((prev)=>({...prev , subjectColor:color}))
    },[color])

    useEffect(()=>{
      setCategory(currentSubject);
      setSHowContent(true);
    },[currentSubject])

    useEffect(()=>{
     if(search){
        let searchData = mainData?.filter((cur)=>cur?.subject?.toLowerCase().includes(search?.toLowerCase()))
       setSubjects(searchData)
     }
     else{
        setSubjects(mainData)
     }
    },[search , mainData])

   return (
    <section className={styles.section}>
        <h1>Pocket Notes</h1>
        <div className={styles.search}>
            <input placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)} /> 
            </div>
        <div className={styles.categories}>
            {subjects.length>0 ? subjects?.map((cur , index)=>(
                <div className={styles.cardDiv} onClick={()=>setCurrentSubject(cur.subject)} id={currentSubject===cur.subject ? styles.bg : "none"}>
                    <div className={styles.card} onClick={()=>setSHowContent(true)}>
                      <div style={{background:`${cur.color}`}}>{getInitials(cur?.subject)}</div>
                       <p>{cur.subject}</p>    
                    </div>
                    <FaShareAlt className={styles.share} onClick={()=>shareSubject(cur?.subject)}/>
           </div>
            )) 
        : 
        <div className={styles.loading}>
        <BarLoader  color='#150087' />
        </div>}
        </div>
          
        <button className={styles.addSubject} onClick={()=>setAddSubject(true)}>+</button>

      {addSubject &&
        <div className={styles.subjectModal}>
            <div className={styles.modal}>
               <h1>Create New Group</h1>
               <label>
                Group Name
                <input placeholder='Enter group name' onChange={(e)=>setData((prev)=> ({...prev , subjectName:e.target.value}))} />
               </label>
               <div className={styles.chooseColor}>
                <p>Choose Color</p>
                <div className={styles.colors}>
                    <button onClick={()=>setColor("#B38BFA")} className={color==="#B38BFA" ? styles.border : 'none'}></button>
                    <button onClick={()=>setColor("#FF79F2")} className={color==="#FF79F2" ? styles.border : 'none'}></button>
                    <button onClick={()=>setColor("#43E6FC")} className={color=="#43E6FC" ? styles.border : 'none'}></button>
                    <button onClick={()=>setColor("#F19576")} className={color=="#F19576" ? styles.border :'none' }></button>
                    <button onClick={()=>setColor("#0047FF")} className={color=="#0047FF" ? styles.border : 'none'}></button>
                    <button onClick={()=>setColor("#6691FF")} className={color=="#6691FF" ? styles.border : 'none'}></button>
                </div>
               </div>
               <div className={styles.create}>
                 <button onClick={()=>handleSubject()}>Create</button>
               </div>
               <button className={styles.close} onClick={()=>setAddSubject(false)}>Close</button>
            </div>
        </div>}
        {/* <ToastContainer /> */}
    </section>
  )
}

export default Subjects