const SVG = 'http://www.w3.org/2000/svg'

function SVGMaker(config) {
    this.id = config.id
    this.name = config.name
    this.nodeName = config.nodeName
    this.d = config.d
    this.viewBox = config.viewBox? [...config.viewBox] : []
    
    this.style = {
        ...config.style
    }

    this.el = document.createElementNS(SVG, this.nodeName)
    this.init()
}

SVGMaker.prototype.init = function() {
    if(this.nodeName === 'svg') this.el.setAttribute('xmlns', SVG)
    
    this.setViewBox()
    this.setStyle()
    
    let String = ''

    if(this.nodeName === 'path') {
        Object.keys(this.d).forEach(key => {
            String += `${key}${this.d[key]}`
            String += ' '
        })

        this.el.setAttribute('d', String)
    }
}

SVGMaker.prototype.setViewBox = function() {
    const viewBoxStr = this.viewBox.join(' ')

    if(!viewBoxStr) return 
    this.el.setAttribute('viewBox', viewBoxStr)
}

SVGMaker.prototype.setStyle = function() {
    for(let prop in this.style) {
        this.el.setAttribute(prop, this.style[prop])
    }
}

export {
    SVGMaker
}