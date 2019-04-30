<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ADVEC</title>
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"></script>
    <!-- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> -->
    <script src="https://cdn.bootcss.com/dom-to-image/2.6.0/dom-to-image.min.js"></script>
    <script src="https://cdn.bootcss.com/FileSaver.js/2014-11-29/FileSaver.min.js"></script>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <script src="dom.js"></script>
    <link href="fonts.css" rel="stylesheet" type="text/css">
    <link href="main.css?v=<?php echo rand() ?>" rel="stylesheet" type="text/css">
    <link href="modelos.css<?php echo rand() ?>" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
</head>
<body>

    <div class="globals">
        <div class="labels">
            <label for="One" class="label">Escolher modelo</label>
            <label for="Two" class="label">Preencher infos</label>
            <label for="Three" class="label">Compartilhar</label>
        </div>
        <div class="progressBar">
            <input type="radio" class="radio" name="progress" value="One" id="One" checked>
            <input type="radio" class="radio" name="progress" value="Two" id="Two" >
            <input type="radio" class="radio" name="progress" value="Three" id="Three">
            <span></span>
            <span></span>
            <span></span>
            <div class="progress">
                <div class="points">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="progress-bar">
                    </div>
            </div>
        </div>
    </div>

    <div id="stepOne" class="step active">
        <div class="heading">
            <h4>escolha o tipo de arte </h4>
            <h4>de acordo com o culto que deseja</h4>
        </div>
       <div class="models">
           <div class="item">Celebração</div>
           <div class="item">Palavra</div>
           <div class="item">Oração</div>
           <div class="item">Vitória</div>
           <div class="item">EBD</div>
           <div class="item">Santa Ceia</div>
           <div class="item">Mulher Vitoriosa</div>
           <div class="item">Família</div>
       </div>
    </div>

    <div id="stepTwo" class="step"><div id="modal"></div>
        <div class="fileType">
            feed
            <label class="switch">
                <input type="checkbox" id="postType">
                <span class="slider round"></span>
            </label>
            story
        </div>
        <div id="template" class="editDisabled">
            <input id="backgroundRangeY" type="range" min="0" max="350" value="0" step="1">
            <div class="toolbar editDisabled">
                <ul>
                    <li class="editDisabled">
                    <label for="file-input" class="editDisabled">
                        <i class="icon-picture-o"></i>
                        <!-- <div class="sub-menu">
                            <img id="single-background" src="assets/icon/single-background.png" alt="">
                            <img id="dual-background" src="assets/icon/dual-background.png" alt="">
                        </div> -->
                    </label>
                    </li>
                    <input id="file-input" class="file-chooser" type="file" name="MAX_FILE_SIZE" value="1048576" onchange="readURL(this)">
                </ul>
            </div>

            <div id="newProject" style="color:white;" class="editDisabled feed">
                <div class="modelo">


                </div>
               
            </div>

        </div>
        <input id="backgroundRangeX" type="range" min="0" max="350" value="0" step="1">
        <div id="btnContinue" class="actionBtn">
            Continuar
        </div>
    </div>

    <div id="stepThree" class="step">
        <div id="share"></div>
        <div id="btnDownload" class="actionBtn">
            Download
        </div>
    </div>

    <div class="temporaryBlocks">
        <!-- Culto da Palavra -->
        <div class="model-palavra">
            <div class="mask editDisabled"></div>
            <div class="content">
                <div class="data">
                    <p>terça-feira</p>
                    <p>às 19h</p>
                </div>
                
                <footer>
                    <div class="endereco">
                        <p class="rua">rua montevidéu<span class="numero">, 900</span></p>
                        <p class="cidade">penha - rj</p>
                    </div>
                </footer>
            </div>
        </div>

        <!-- Culto da Família -->
        <div class="model-familia">
            <div class="mask editDisabled"></div>
            <div class="content">
                <div class="row">
                    <div class="col autores">
                        <div class="nomes">
                            <p>Andrea Santos</p>
                            <p>Danielle Cristina</p>
                        </div>
                    </div>
                    <div class="col data">
                        <p>03/julho</p>
                        <p>às 19h</p>
                    </div>
                </div>
            </div>
            
            <footer>
                <div class="endereco">
                    <p class="rua">rua montevidéu<span class="numero">, 900</span></p>
                    <p class="cidade">penha - rj</p>
                </div>
            </footer>
        </div>

        <!-- Culto da Vitória -->
        <div class="model-vitoria">
            <div class="mask editDisabled"></div>
            <div class="content">
                <div class="col autores">
                    <div class="nomes">
                        <p>Pr. Silmar Coelho</p>
                        <p>Samuel Lima</p>
                    </div>
                </div>
                <div class="col data">
                    <p>quinta</p>
                    <p>12 de Outubro às 19h</p>
                </div>
            </div>
            <footer>
                <div class="endereco">
                    <p class="rua">rua montevidéu<span class="numero">, 900</span></p>
                    <p class="cidade">penha - rj</p>
                </div>
            </footer>
        </div>

        <!-- Culto da Celebração -->
        <div class="model-celebracao">
        <div class="mask editDisabled"></div>
            <div class="content">
                <div class="col data">
                    <div class="nomes">
                        <p>domingo às 18h30</p>
                    </div>
                </div>
                <div class="col pr">
                    <p>Pr. Silas</p>
                    <p>Malafaia</p>
                </div>
            </div>
            <footer>
                <div class="endereco">
                    <p class="rua"  contenteditable="true">rua montevidéu<span class="numero">, 900</span></p>
                    <p class="cidade">penha - rj</p>
                </div>
            </footer>
        </div>
    
        <!-- Culto EBD -->
        <div class="model-ebd">
            <div class="mask editDisabled"></div>
            <div class="content">
                <div class="col data">
                    <div class="nomes">
                        <p>domingo às 18h30</p>
                    </div>
                </div>
                <footer>
                    <div class="endereco">
                        <p class="rua">rua montevidéu<span class="numero">, 900</span></p>
                        <p class="cidade">penha - rj</p>
                    </div>
                </footer>
            </div>
        </div>

        <!-- Culto de Oração -->
        <div class="model-oracao">
            <div class="mask editDisabled"></div>
            <div class="content">
                <div class="row">
                    <div class="col autores">
                        <div class="nomes">
                            <p>quarta às 19h</p>
                        </div>
                    </div>
                    <div class="col data">
                        <p>Pr. Felipe</p>
                        <p>Panza</p>
                    </div>
                </div>
            </div>
            
            <footer>
                <div class="endereco">
                    <p class="rua">rua montevidéu<span class="numero">, 900</span></p>
                    <p class="cidade">penha - rj</p>
                </div>
            </footer>
        </div>

        <!-- Culto da Vitória -->
        <div class="model-mulher-vitoriosa">
            <div class="mask editDisabled"></div>
            <div class="content">
                <div class="col autores">
                    <div class="nomes">
                        <p>Andrea Santos</p>
                        <p>Danielle Cristina</p>
                    </div>
                </div>
                <div class="col data">
                    <p>03/jul</p>
                    <p>às 19h</p>
                </div>
            </div>
            <footer>
                <div class="endereco">
                    <p class="rua">rua montevidéu<span class="numero">, 900</span></p>
                    <p class="cidade">penha - rj</p>
                </div>
            </footer>
        </div>

        <!-- Culto de Oração -->
        <div class="model-santa-ceia">
            <div class="mask editDisabled"></div>
            <div class="content">
                <div class="row">
                    <div class="col data">
                        <p>domingo às 9h30 e 18h30</p>
                    </div>
                </div>
            </div>
            
            <footer>
                <div class="endereco">
                    <p class="rua">rua montevidéu<span class="numero">, 900</span></p>
                    <p class="cidade">penha - rj</p>
                </div>
            </footer>
        </div>

    </div><!-- /temporaryBlocks  -->

    <script src="main.js<?php echo rand() ?>"></script>
</body>
</html>