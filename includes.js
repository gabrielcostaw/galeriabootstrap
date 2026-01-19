import $ from 'jquery'


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

                
                loadIncludes(e, callback)
                
                
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