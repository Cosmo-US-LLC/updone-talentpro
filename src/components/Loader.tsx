import styles from "@/styles/loader.module.css";

function Loader() {
  return (
    <div className="h-full min-h-[400px] w-full flex justify-center items-center">
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;
