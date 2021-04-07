import React from 'react';
import Card from 'react-bootstrap/Card';
import "../stylesheets/Home.css"
import CardColumns from 'react-bootstrap/CardColumns'



 function CreatedPoll() {
    return (
        <div className='reg'>
        <CardColumns>
            <Card style={{width:'400px',
        backgroundColor: "blue",}}>
                <Card.Title>Create Polls</Card.Title>
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

export default CreatedPoll;