import React from 'react'

const MessageContainer = () => {
  const styles = {
    container:{
      border:" 1px solid black",
      borderRadius:"7px",
      width:"95%",
      height:"80%",
      marginBottom:"auto",
      padding:"15px",
      boxShadow:"2px 2px 1px 1px black",
      backgroundColor:"black",
    }, 
  };
  return (
    <div style={styles.container}></div>
  )
}

export default MessageContainer