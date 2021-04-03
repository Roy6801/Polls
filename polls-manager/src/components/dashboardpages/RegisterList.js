import React from 'react'
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'
import ListGroup from 'react-bootstrap/ListGroup'
import "../stylesheets/Home.css"

 function RegisterList() {
    return (
        <div className='reg'>
           <CardColumns>
               <Card style={{width:'18rem'}}>
                   <Card.Title>Regsitered Polls</Card.Title>
                   <ul  className='list'>
                        <li>text</li>
                        <li>text</li>
                        <li>text</li>
                        <li>text</li>
                        <li>text</li>
                        <li>text</li>
                        <li>text</li>
                        <li>text</li>
                        <li>text</li>
                        <li>text</li>
                        <li>text</li>
                        <li>text</li>
                   </ul>

               </Card>
           </CardColumns>
            
        </div>
    )
}
export default RegisterList;
