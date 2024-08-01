import React from 'react'
import styles from './LoadScreen.module.css'
import pocketNewBg from '../../assets/pocketNewBg.png'
import { MdLock } from "react-icons/md";

const LoadScreen = () => {
  return (
    <div className={styles.section}>
          <div className={styles.LoadImg}>
           <img src={pocketNewBg} />
           <h1>Pocket Notes</h1>
           <p>Send and receive messages without keeping your phone online.
           Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
           </div>
           <div className={styles.encryption}>
           <MdLock />
           <p>end-to-end encrypted</p>
           </div>
    </div>
  )
}

export default LoadScreen