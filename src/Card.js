import React, {Component } from 'react';

class Card extends Component {
   
    render() {
        let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const d = new Date(this.props.day)
        let today = weekdays[d.getDay()];

        return(  
               
            <span className="weather-box">
                <div className="temp">
                    <div>
                    <div>{today}</div>
                        <img 
                        className="icon" 
                        src={require(`./images/${this.props.icon}.png`).default} 
                        alt=""
                    />
                    </div>
                    
                    <span className="min">{Math.round(this.props.min)}° </span>
                    <span className="max">{Math.round(this.props.max)}°</span>
                </div>
              
            </span>
              
                      
        )
    }
}

export default Card;