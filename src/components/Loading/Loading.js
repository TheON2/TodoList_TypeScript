import {Circle, Spinner} from "./style";

const Loading =()=>{
  return(
    <Spinner className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <Circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></Circle>
    </Spinner>
  )
}

export default Loading