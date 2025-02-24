"use client"
import styles from './loader.module.css'

const RenderLoader = () => {
    return (
       <div className="h-[100vh] w-full flex justify-center items-center">
        <div className={styles.loader}></div> 
       </div>
    );
};

export default RenderLoader;
