import React, {Component } from 'react';
import Card from './Card';

const api = {
    key: "3c05d3bb16101207d5e2c90ddecf3b09",
    base: "https://api.openweathermap.org/data/2.5/"
}

// here is the api we can use next time to hardcode our locaiton
// and make the daily forecast easier to do.
// https://openweathermap.org/api/one-call-api

class App extends Component {
    constructor(props) {
        super(props);
            this.state = {
                query: '',
                weather: [],
                place: '',
                temp: null,
            }
        }

    dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();

        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    search = (evt) => {
        if (evt.key === 'Enter') {
            fetch(`${api.base}forecast?q=${this.state.query}&units=imperial&APPID=${api.key}`)
            .then(res => res.json())
            .then(({ list, city }) => {
                
                this.setState({
                    weather: list,
                    place: (city.name),
                    country: (city.country),
                    query: '',
                    temp: list[0].main.temp,
                })
            })
        }
    }

    renderCard({
        i, min, max, icon, day,
    }) {
        return(   
            <span className="card">
                
                    <Card className="item"
                    index={i} 
                    min={min} 
                    max={max} 
                    icon={icon} 
                    day={day}
                    />
                
            </span>
        )
    }

    render() {
        const { weather ,place, country, query, temp } = this.state;

        return(
            <div 
            className ={(typeof weather != "undefined") ? 
                (((temp) > 59) ? 
                    'app warm' : 'app') : 
                'app'}>
            <main>
                <div className = "search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search for a City"
                        onChange={e => this.setState({query: e.target.value})}
                        value={query}
                        onKeyPress={e => this.search(e)}               
                        />
                </div>
               
                {(typeof weather[0] != "undefined") ? ( 
                <div>
                    <div className="location-box">
                        <div className="location">
                            {place}, 
                            {country}
                        </div>
                        <div className="date">{this.dateBuilder(new Date())}</div>
                    </div>

                    <div className="forecast">
                        {console.log(this.state.weather[2])}
                        {this.renderCard({
                            i: 0,
                            min: weather[0].main.temp_min,
                            max: weather[0].main.temp_max,
                            icon: weather[0].weather[0].icon,
                            day: weather[0].dt_txt
                            })}
                        {this.renderCard({
                            i: 1,
                            min: weather[1*8].main.temp_min,
                            max: weather[1*8].main.temp_max,
                            icon: weather[1*8].weather[0].icon,
                            day: weather[1*8].dt_txt
                        })}
                        {this.renderCard({
                            i: 2,
                            min: weather[2*8].main.temp_min,
                            max: weather[2*8].main.temp_max,
                            icon: weather[2*8].weather[0].icon,
                            day: weather[2*8].dt_txt
                        })}
                        {this.renderCard({
                            i: 3,
                            min: weather[3*8].main.temp_min,
                            max: weather[3*8].main.temp_max,
                            icon: weather[3*8].weather[0].icon,
                            day: weather[3*8].dt_txt
                        })}
                        {this.renderCard({
                            i: 4,
                            min: weather[4*8].main.temp_min,
                            max: weather[4*8].main.temp_max,
                            icon: weather[4*8].weather[0].icon,
                            day: weather[4*8].dt_txt
                        })}
                    </div>
                </div>
                ) : ('')}

            </main>
        </div> 
        )
    }
}

export default App;