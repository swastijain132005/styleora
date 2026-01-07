import React from 'react'
import styles from './layout.module.css'


export default function layout() {
  return (
    <div className={styles.layout}>

      <div className={styles.overlay}>
        <h2>styles created just for you</h2>
        <div className={styles.overlay_div}>
          <h4>personlized fashion reimagined!!!🛍️🛒</h4>
        </div>

        <button>shop now</button>
      </div>
     <img src="images/photo1.jpg"alt="coming_soon" />
     <img src="images/photo3.jpg"alt="coming_soon" />
     <img src="images/photo2.jpg"alt="coming_soon" />
     <img src="images/men.jpg"alt="coming_soon" />
     <img src="images/trio.jpg"alt="coming_soon" />
      
    </div>
  )
}
