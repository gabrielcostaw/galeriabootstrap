import $ from 'jquery'

// Adicionei 'callback' como parâmetro

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

export function loadIncludes(parent, callback) {
    if(!parent) parent = 'body'
    $(parent).find('[include]').each(function(i, e) {
        const url = $(e).attr('include')
        $.ajax({
            url,
            success(data) {
                $(e).html(data)
                $(e).removeAttr('include')

                // Chama a função novamente para includes aninhados
                loadIncludes(e, callback)
                
                // Se houver um callback e não houver mais nada para incluir, executa
                if (callback && $(parent).find('[include]').length === 0) {
                    callback()
                
                loadHtmlSuccessCallbacks.forEach
                (callback => callback(data))
                loadIncludes(e)
                }
            }
        })
    })
}

loadIncludes()