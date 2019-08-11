import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './main.css';
import '../../../story.css';
import { FaImage } from 'react-icons/fa';
import defaultImage from '../../../assets/img/default.png';
import Models from '../models';

class Palavra extends Component {
    constructor() {
        super();
        this.state = {
            data: 'domingo às 19h', 
            endereco: 'rua montevidéu, 900 penha - rj', 
            pastor: 'Pr. Silas Malafaia',
            backgroundImage: '',
            modelType: '',
        }
    }
      
    render() {
        return (
            <MuiThemeProvider>
                <Models datadia={this.state.data} dataendereco={this.state.endereco} dataautor={this.state.pastor}/>
            </MuiThemeProvider>
        );
    }
}

export default Palavra;
