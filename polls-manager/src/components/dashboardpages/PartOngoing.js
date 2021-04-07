import React from 'react';
import "../stylesheets/Home.css";
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns'



function PartOngoing() {
    return (
        <div className='reg'>
        <CardColumns>
            <Card style={{width:'400px',
                            backgroundColor: "orange",
        }}>
                <Card.Title>Participated Ongoing Polls</Card.Title>
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
export default PartOngoing;