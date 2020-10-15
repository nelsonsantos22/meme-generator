import React, { Component } from 'react'

class MemeGenerator extends Component {
    
    constructor() {
        super()
        this.state = {
            topText : "",
            bottomText : "", 
            randomImgs : "http://i.imgflip.com/1bij.jpg",
            allMemeImgs : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSummit = this.handleSummit.bind(this)
    }

   

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                /* here i'm making the same stuff as the form exercise to avoid to write response.data.memes
                *  every time i want to refer to memes array, like so i only have to write memes[0] to acess
                *  to the first position of the array
                */
                const {memes} = response.data
                console.log(memes[0])
                this.setState({
                    allMemeImgs : memes
                })
            })
    }

    handleChange(event) {
        const {name , value} = event.target
        this.setState ({
            [name] : value
        })
    }

    handleSummit(event) {
        event.preventDefault()
        const randomNumber = Math.ceil(Math.random(0, this.state.allMemeImgs.length)*100)
        const randomMeme = this.state.allMemeImgs[randomNumber].url
        this.setState({
            randomImgs : randomMeme
        })
    }

    render() {
        console.log(this.state.allMemeImgs)
        return (
            <div>
                <form className="meme-form" onSubmit = {this.handleSummit}>
                    <input 
                        name = "topText"
                        onChange = {this.handleChange}
                        value = {this.state.topText}
                        placeholder = "Top Text" 
                    />
                    <input 
                        name = "bottomText"
                        onChange = {this.handleChange}
                        value = {this.state.bottomText}
                        placeholder = "Bottom Text" 
                    />
                    <button>Gen</button>
                </form>
                <div className = "meme">
                    <img src = {this.state.randomImgs} alt = "Meme"/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator