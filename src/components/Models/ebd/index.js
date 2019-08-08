import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './main.css';
import { FaImage } from 'react-icons/fa';

class Ebd extends Component {
    constructor() {
        super();
        this.state = {
            data: 'domingo às 18h30', endereco: 'rua montevidéu, 900 penha - rj', pastor: 'Pr. Silas Malafaia',
            backgroundImage: ''
      }

        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
      }
        handleInputChange(e){
          const target = e.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;
          this.setState({
              [name]: value
          });
      }

    triggerInput = () => {
        document.querySelector("input[type='file']").click();
    }

    handleBackgroundChange(e) {
        const background = document.getElementById('boxToEdit');
        const file = e.target.files[0];
        const reader = new FileReader();
       

        reader.onloadend = function () {
            background.src = reader.result;
            console.log(reader);
            background.style.backgroundImage = "url('"+reader.result+"')";
        }
        
        
        if (file) {
        reader.readAsDataURL(file);
        } else {
            background.src = "";
        }
        
     
    }
    getCANVAS(){
        let node = document.getElementById('boxToEdit');
        domtoimage.toBlob(node)
        .then(function (blob) {
            window.saveAs(blob, 'my-node.png');
        });
    }
      
    render() {
        
        let baseBackground = this.state.backgroundImage.toString();
        const { data, endereco, pastor } = this.state;

        return (
            <MuiThemeProvider>
            <div className="App-editor">
                <div className="container">
                    <div className="contentBox">
                        <div id="boxToEdit">
                            <div className="defaultBackground feed">
                                <div className="boxContent">
                                    <div className="row">
                                        <div className="date">{data}</div>
                                        <div className="minister">{pastor}</div>
                                    </div>
                                    <div className="row">
                                        <div className="address">{endereco}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contentFields">
                        <div className="fields">
                            <div className="imgChange" onClick={this.triggerInput}>
                                <FaImage/>
                            </div>
                            <input type="file" class="fileInput" onChange={this.handleBackgroundChange}  accept="image/*" />
                            
                            <TextField name="data" placeholder="Nome" onChange={this.handleInputChange} value={data} />
                            <TextField name="endereco" onChange={this.handleInputChange} value={endereco} />
                            <TextField name="pastor" onChange={this.handleInputChange} value={pastor} />
                            <Button onClick={this.getCANVAS} variant="contained" color="primary">
                                GERAR
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default Ebd;
