// arquivos sass
import './scss/index.scss'

//dependencias
import 'jquery'
import 'bootstrap'

//meus arquivos js
// src/index.js
import $ from 'jquery' 
import './js/core/includes'
import './js/plugins/cityButtons'

const tentarCarregarBotoes = setInterval(() => {
   
    const fotos = $('[city]') 
    
    if (fotos.length > 0) {
        $('[city-buttons]').cityButtons()
        clearInterval(tentarCarregarBotoes)
    }
}, 300)