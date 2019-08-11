import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './main.css';
import '../../../story.css';
import { FaImage } from 'react-icons/fa';
import defaultImage from '../../../assets/img/default.png';

class Ebd extends Component {
    constructor() {
        super();
        this.state = {
            data: 'domingo às 18h30', endereco: 'rua montevidéu, 900 penha - rj', pastor: 'Pr. Silas Malafaia',
            backgroundImage: '',
            modelType: '',
            
      }
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
        this.handleBackgroundTemplate = this.handleBackgroundTemplate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.changeModelType = this.changeModelType.bind(this)
      }
        handleInputChange(e){
          const target = e.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;
          this.setState({
              [name]: value
          });
      }

    triggerInput = (event) => {
        document.querySelector("input[type='file']").click();
        this.setState({modelType: event.currentTarget.dataset.type});
        
    }

    handleBackgroundTemplate(e) {
        let backgroundOptions = document.getElementsByClassName('backgroundOptions')[0];
        backgroundOptions.classList.add('active');
    }

    handleBackgroundChange(e){
        console.log(e);
        let background;
        if(this.state.modelType == 'single'){
            background = document.getElementById('boxToEdit');
        }
        else if(this.state.modelType == 'dual-one'){
            background = document.getElementById('dual-one');
        }
        else if(this.state.modelType == 'dual-two'){
            background = document.getElementById('dual-two');
        }
        
       
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

        // RENDER HOURS //

        var date = new Date();
        let formatedDate = date.getDate() + '/'+ (date.getMonth() + 1) + '/'+ date.getFullYear()+ '-'+ date.getHours()+ '-'+ date.getMinutes()+ '-'+ date.getSeconds();
        let node = document.getElementById('boxToEdit');
        domtoimage.toBlob(node)
        .then(function (blob) {
            window.saveAs(blob, 'reino-criativo-'+formatedDate+'.png');
        });
    }

    changeModelType(e){
        let modelType = e.target.innerHTML;
        let root = document.getElementById('root');

        root.className = '';
        root.className = modelType;
    }

    handleBackgroundPosition(e){
        let valueToChange = e.target.value;
        let changePosition = e.currentTarget.dataset.id;
        let focusBackground;
        console.log(changePosition);

        if(changePosition === 'dual-one'){
            focusBackground = document.getElementById('dual-one');
        }
        if(changePosition === 'dual-two'){
            focusBackground = document.getElementById('dual-two');
        }
        if(changePosition === 'single'){
            focusBackground = document.getElementById('boxToEdit');
        }

        console.log(focusBackground);

        focusBackground.style.backgroundPosition = valueToChange;
    }

      
    render() {
        
        let renderBackgroundOptions;
        let positionBackground;

        if(this.props.backgroundtype === "two"){
            let clearBoxToEdit = document.getElementById('boxToEdit');
            let dumpoption = document.getElementById('dumpoption');
            let imgChangeOptions = document.getElementsByClassName('imgChangeOptions')[0];
            let changeBackgroundType = document.getElementsByClassName('changeBackgroundType')[0];

            imgChangeOptions.classList.add('active');
            dumpoption.classList.add('hide');
            changeBackgroundType.classList.add('active');
            clearBoxToEdit.style.backgroundImage = '';

            positionBackground = 
                <div className="backgroundPosition dual">
                    <div className="box">
                        <select name="position" data-id="dual-one" onChange={this.handleBackgroundPosition.bind(this)}>
                            <option value="default">Posicionar</option>
                            <option value="top">Cima</option>
                            <option value="bottom">Baixo</option>
                            <option value="left">Esquerda</option>
                            <option value="right">Direita</option>
                            <option value="center">Centro</option>
                        </select>
                    </div>
                    <div className="box">
                        <select name="position" data-id="dual-two" onChange={this.handleBackgroundPosition.bind(this)}>
                            <option value="default">Posicionar</option>
                            <option value="top">Cima</option>
                            <option value="bottom">Baixo</option>
                            <option value="left">Esquerda</option>
                            <option value="right">Direita</option>
                            <option value="center">Centro</option>
                        </select>
                    </div>
                 </div>;

            renderBackgroundOptions = 
            <div className="options dual">
                <div className="imgChange" data-type="dual-one" onClick={this.triggerInput.bind(this)}>
                    <FaImage/>
                </div>
                <div className="imgChange" data-type="dual-two" onClick={this.triggerInput.bind(this)}>
                    <FaImage/>
                </div>
            </div>
        }
        else if(this.props.backgroundtype === "one"){
            let dumpoption = document.getElementById('dumpoption');
            let imgChangeOptions = document.getElementsByClassName('imgChangeOptions')[0];
            let changeBackgroundType = document.getElementsByClassName('changeBackgroundType')[0];
            let dualBackground  = document.getElementsByClassName('dualBackground ')[0];

            imgChangeOptions.classList.add('active');
            dumpoption.classList.add('hide');
            changeBackgroundType.classList.add('active');
            dualBackground.classList.remove('active');
            
            positionBackground = 
            <div className="backgroundPosition single">
                <div className="box">
                    <select name="position" data-id="single" onChange={this.handleBackgroundPosition.bind(this)}>
                        <option value="default">Posicionar</option>
                        <option value="top">Cima</option>
                        <option value="bottom">Baixo</option>
                        <option value="left">Esquerda</option>
                        <option value="right">Direita</option>
                        <option value="center">Centro</option>
                    </select>
                </div>
             </div>;

            renderBackgroundOptions = 
            <div className="options single">
                <div className="imgChange" data-type="single"  onClick={this.triggerInput.bind(this)}>
                    <FaImage/>
                </div>
            </div>
        }
        
        let baseBackground = this.state.backgroundImage.toString();
        const { data, endereco, pastor } = this.state;

        return (
            <MuiThemeProvider>
            <div className="App-editor">
                <div className="container">
                    <div className="contentBox">
                        <div id="boxToEdit">
                            <div className="dualBackground">
                                <div id="dual-one" className="one option"></div>
                                <div id="dual-two" className="two option"></div>
                            </div>
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
                            <div className="modelType">
                                <Button onClick={this.changeModelType.bind(this)} className="model-btn">
                                    feed
                                </Button>
                                <Button onClick={this.changeModelType.bind(this)} className="model-btn">
                                    story
                                </Button>
                            </div>
                            <h4 className="backgroundTitle">Imagem de fundo</h4>
                            <div className="imgChange" id="dumpoption" onClick={this.handleBackgroundTemplate}>
                                <FaImage/>
                            </div>

                            <div className="imgChangeOptions">
                                {renderBackgroundOptions}
                                {positionBackground}
                                <Button onClick={this.handleBackgroundTemplate} className="model-btn changeBackgroundType">
                                    Alterar
                                </Button>
                            </div>
                            <input type="file" className="fileInput" onChange={this.handleBackgroundChange}  accept="image/*" />
                            
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
