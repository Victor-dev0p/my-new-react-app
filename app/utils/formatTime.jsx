// app/utils/formatTime.js

const formatTimestampToTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert 0 to 12
  
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${hours}:${formattedMinutes} ${ampm}`;
    
  }
  
  export default formatTimestampToTime;  