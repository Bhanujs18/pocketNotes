import React, { useEffect, useState } from 'react'
import styles from './DashBoard.module.css'
import LoadScreen from '../../components/LoadScreen/LoadScreen';
import Content from '../../components/Content/Content';
import Subjects from '../../components/Subjects/Subjects';
import { getSubjects } from '../../apis/subject';

const DashBoard = () => {
    const [showContent , setSHowContent] = useState(false)
    const [mainData , setData] = useState([])
    const [category , setCategory] = useState()
    const [pageContent , setPageContent] = useState();
    const fetchData = async() => {
        const res = await getSubjects()
        if(res.data){
            setData(res?.data?.data)
            filterData()
        }
    }

    const filterData = () => {
        if(mainData){
            const filteredData = mainData.filter((cur)=> cur.subject === category); 
            if(filterData){
                setPageContent(...filteredData);
                setSHowContent(true)
            }
        }
    }


    useEffect(()=>{
        console.log(category)
        fetchData()
        console.log(!!pageContent)
    },[category])

  return (
    <section className={styles.section}>
        <div className={styles.leftSection}>
        <Subjects setData={setData} setCategory={setCategory} mainData={mainData} setSHowContent={setSHowContent} />
        </div>

        <div className={styles.rightSection}>
        {!!pageContent ? <Content pageContent={pageContent}/>  : <LoadScreen />}
        </div>
    </section>
  )
}

export default DashBoard