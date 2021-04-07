import React from 'react';
import Card from 'react-bootstrap/Card';
import "../stylesheets/Home.css";
import CardColumns from 'react-bootstrap/CardColumns'



function PollToStart() {
    return (
        <div className='reg'>
        <CardColumns>
            <Card style={{width:'400px',
        backgroundColor: "yellow",}}>
                <Card.Title>Poll  About To Start</Card.Title>
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
export default PollToStart;
