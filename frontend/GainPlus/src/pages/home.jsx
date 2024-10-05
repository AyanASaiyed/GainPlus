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
<<<<<<< HEAD
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

=======
      alignItems: "center",
    },
    label: {
      fontSize: "25px",
      padding: "5px",
    },
    input: {
      fontSize: "25px",
>>>>>>> 5d10eece6ca4baeb5eb2ad612d09d7666b4429e0
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
  const [isSignUpActive, setIsSignUpActive]= useState(false);
  const handleMethodChange=() =>{
    setIsSignUpActive(!isSignUpActive);
  };
  return (
    <section style={styles.maincontainer}>
      <h2 style={styles.heading}> Welcome!!</h2>
      <form style={styles.container}>
        {isSignUpActive && <legend style={styles.heading}>Sign In</legend>}
        {!isSignUpActive && <legend style={styles.heading}>Sign Up</legend>}
        
        <fieldset>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input type="text" id="email" style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input type="password" id="password" style={styles.input} />
          </div>
          {!isSignUpActive && <button title="Submit" style={styles.button}>Sign Up</button>}
          {isSignUpActive && <button title="Submit" style={styles.button}>Login</button>}
        </fieldset>
        {!isSignUpActive && <a style={styles.login} onClick={handleMethodChange}>Already have an account? Login</a>}
        {isSignUpActive && <a style={styles.login} onClick={handleMethodChange}>New to Gain Plus? Sign Up</a>}
      </form>
      <div></div>
    </section>
  );
};

export default Home;
