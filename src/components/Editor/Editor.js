import React, { Component } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

import './Editor.css';

import Celebracao from '../Models/celebracao';




class Editor extends Component {
    
    constructor() {
        super();
        this.state = {
        firstName: 'Guilherme Lopes', lastName: 'Teste', email: 'ttttt', acceptTerms: false
      }
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
    
      updateTopMostParent() {
          window.updateTopMostParent(3); 
      }

      getCANVAS(){
        let node = document.getElementById('boxToEdit');
        domtoimage.toBlob(node)
        .then(function (blob) {
            window.saveAs(blob, 'my-node.png');
        });
    }
      

      render() { 
        console.log();
        return ( 
            <Celebracao />
         );
      }
}
 
export default Editor;