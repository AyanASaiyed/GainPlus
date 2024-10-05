import React from "react";
const Home = () => {
  const styles = {
    container: {
      border: "2px solid black",
      padding: "20px",
      borderRadius: "5px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    
    },
  };
  return (
    <section>
      <h2> Welcome!!</h2>
      <form style={styles.container}>
        <legend>Sign Up</legend>
        <fieldset>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input type="text" id="email" />

            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input type="password" id="password" />
          </div>
        </fieldset>
      </form>
      <div></div>
    </section>
  );
};

export default Home;
