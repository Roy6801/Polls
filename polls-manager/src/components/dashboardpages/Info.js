import React from "react";
import Figure from "react-bootstrap/Figure";

const Info = (props) => {
  return (
    <div>
      <Figure as="figure" elevation={20}>
        <Figure.Image
          width={100}
          height={100}
          src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
        ></Figure.Image>
        <Figure.Caption>
          <h4>Welcome,</h4>
          <h2>{props.userName}</h2>
        </Figure.Caption>
      </Figure>
    </div>
  );
};;

export default Info;
