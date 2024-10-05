import React from "react";
const Home = () => {
  const styles = {
    container: {
      border: "2px solid black",
      padding: "10px",
      borderRadius: "5px",
    },
    heading:{
        fontSize:"30px",
        textAlign:"left",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      alignItems:"center",
    },
    label:{
        fontSize:"25px",
        padding:"5px",
    },
    input:{
        fontSize:"25px",
    },
  };
  return (
    <section>
      <h2 style={styles.heading}> Welcome!!</h2>
      <form style={styles.container}>
        <legend style={styles.heading}>Sign Up</legend>
        <fieldset>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input type="text" id="email" style={styles.input}/>
            </div>
            <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input type="password" id="password" style={styles.input}/>
          </div>
        </fieldset>
      </form>
      <div></div>
    </section>
  );
};

export default Home;
