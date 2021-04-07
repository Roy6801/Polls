import React from 'react';
import "../stylesheets/Home.css";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'



function CreatedOngoing() {
    return (
        <div className='reg'>
           <CardColumns>
               <Card style={{width:'400px',
            backgroundColor: "green",}}>
                   <Card.Title>Created Ongoing Polls</Card.Title>
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
export default CreatedOngoing;
