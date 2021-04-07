import React from "react";
import Figure from "react-bootstrap/Figure";

const Info = (props) => {
  return (
    <div >
      <Figure as="figure" elevation={20}>
       
        <Figure.Caption style={{backgroundColor:"Yellow"}} >
          <h4>Welcome,</h4>
          <h2>{props.userName}</h2>
        </Figure.Caption>
      </Figure>
    </div>
  );
};;

export default Info;
