import $ from 'jquery'
 import {onLoadHtmlSuccess} from '../core/includes'

const duration = 600

function filterByCity(city){
    $('[city]').each(function(i, e) {
        const isTarget = $(this).attr('city') === city
        || city === null
        if(isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.cityButtons = function() {
    
const cities = new Set 
$('[city]').each(function(i, e) {
    cities.add($(e).attr('city'))
})

const changeActiveButton = (target) => {
    $(target).addClass('active').siblings().removeClass('active')
}

const btns = Array.from(cities).map(city => {
    const btn = $('<button>')
    .addClass(['btn', 'btn-info']).html(city)
    btn.click(e => {
        filterByCity(city)
        changeActiveButton(e.target)
    })
    
    return btn
})

const btnAll = $('<button>')
    .addClass(['btn', 'btn-info', 'active']).html('Todas')
btnAll.click(e => filterByCity(null))
btns.push(btnAll)

const btnGroup = $('<div>').addClass(['btn-group', 'flex-wrap', 'justify-content-center'])
btnGroup.append(btns)

$(this).html(btnGroup)
return this
}
$('[city-buttons]').cityButtons()

onLoadHtmlSuccess(function() {
    $('[city-buttons').cityButtons()
})