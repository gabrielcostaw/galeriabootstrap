// arquivos sass
import './scss/index.scss'

//dependencias
import 'jquery'
import 'bootstrap'

//meus arquivos js
// src/index.js
import $ from 'jquery' // ADICIONE ESTA LINHA NO TOPO
import '../includes'
import './js/plugins/cityButtons'

const tentarCarregarBotoes = setInterval(() => {
    // Agora o '$' vai funcionar
    const fotos = $('[city]') 
    
    if (fotos.length > 0) {
        $('[city-buttons]').cityButtons()
        clearInterval(tentarCarregarBotoes)
    }
}, 300)