import React from 'react'
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'
import ListGroup from 'react-bootstrap/ListGroup'
import "../stylesheets/Home.css"

 function RegisterList() {
    return (
        <div className='reg'>
           <CardColumns>
               <Card syle={{width:'18rem'}}>
                   <Card.Title>Regsitered Polls</Card.Title>
                   <ListGroup Variant='flush'>
                       <ListGroup.Item>Poll for School</ListGroup.Item>
                       <ListGroup.Item>Poll for society</ListGroup.Item>
                       <ListGroup.Item>Poll for NMMC</ListGroup.Item>

                   </ListGroup>

               </Card>
           </CardColumns>
            
        </div>
    )
}
export default RegisterList;
