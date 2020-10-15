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
    }

    handleChange(event) {
        const {name , value} = event.target
        this.setState ({
            [name] : value
        })
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

    render() {
        console.log(this.state.allMemeImgs)
        return (
            <form className="meme-form">
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
        )
    }
}

export default MemeGenerator