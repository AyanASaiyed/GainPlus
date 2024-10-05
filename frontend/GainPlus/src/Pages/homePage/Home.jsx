import React, { useState } from "react";
const Home = () => {
  const styles = {
    maincontainer:{
        width:"350px",
    },
    container: {
      border: "2px solid black",
      padding: "10px",
      borderRadius: "5px",
    },
    heading: {
      fontSize: "30px",
      textAlign: "left",
    },
    formGroup: {
        display:"flex",
      flexDirection: "column",
      alignItems:"flex-start",
      
    },
    label:{
        fontSize:"25px",
        padding:"5px",
        textAlign:"left"
    },
    input:{
        fontSize:"15px",
        padding: "10px",
        width:"90%",
      alignItems: "center",
    },
    label: {
      fontSize: "25px",
      padding: "5px",
    },
    input: {
      fontSize: "25px",
    },
    button:{
        marginTop:"20px",
        padding:"5px",
        width:"50%",
        color:"white",
        height:"40px",
        cursor:"pointer",
        alignItems:"flex-start",
    },
    login:{
        cursor:"pointer",
        fontSize:"20px",
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <h2 style={styles.heading} className="font-bold"> Welcome!!</h2>
    </section>
  );
};

export default Home;
