import { treeData } from './data.js'
import { SVGMaker } from './make-svg.js'

const container = document.querySelector('.svg-container')

const SVGContainer = new SVGMaker({
    nodeName: 'svg',
    style: {
        width: '500',
        height: '500'
    },
    viewBox: [-20, -20, 1000, 1000]
})

container.append(SVGContainer.el)

/*
1. 선을 만든다.
2. 간격을 준다.
*/

const drawArray = []

function setSVGTree(data, startX, startY, interval, depth) {
    const style = {
        stroke: `red`,
        strokeWidth: `3px`
    }

    startX = startX || 0
    startY = startY || 0
    depth = depth || 0
    
    let childLength = 0

    // X줄
    // data.forEach((value, index) => {
    //     let x = startX * interval
    //     let ylength = (startY + index + childLength)
    //     let y = ylength * interval 

    //     draw(x, y, interval, 0, style)

    //     drawYLength += 1

    //     if(!Object.prototype.hasOwnProperty.call(value, 'children')) return
    //     if(value.children.length === 0) return 

    //     console.log('children', value.children.length)
    //     drawYLength += value.children.length
        
    //     // 자식 그리기
    //     setSVGTree(value.children, startX + 1, ylength, interval, style)
    //     childLength += value.children.length - 1
    // })
    let drawYLength = 0

    for(let i = 0; i < data.length; i++) {
        const value = data[i]

        let x = startX * interval
        let ylength = (startY + i + childLength)
        let y = ylength * interval 

        draw(x, y, interval, 0, style)

        if(!Object.prototype.hasOwnProperty.call(value, 'children')) continue
        if(value.children.length === 0) continue 

        // 자식 그리기
        const yValue = setSVGTree(value.children, startX + 1, ylength, interval, style)
        childLength += value.children.length - 1

        // x = (startX + 1) * interval
        // const drawYLength = childLength + yValue
        // console.log(x, y)
        // // console.log(drawYLength)
        // const index = draw(x, y, 0, drawYLength * interval, style)
        // console.log(drawArray[index - 1].el)
    }

    // Y줄
    // if(depth !== 0) {
    //     let x = startX * interval
    //     let y = (startX - 1) * interval

    //     console.log(startX, y, drawYLength)
    //     const index = draw(x, y, 0, drawYLength * interval, style)

    //     console.log(drawArray[index - 1].el)
    // } // 

    return drawYLength
}

function draw(x, y, endX, endY, style){
    const index = drawArray.push(
        new SVGMaker({
            nodeName: 'path',
            d: {
                m: `${x} ${y}`,
                l: `${endX} ${endY}`,
            },
            style: {
                stroke: `${style.stroke}`,
                'stroke-width': `${style.strokeWidth}`,
                fill: `${style.fill}`
            }
        })
    )

    return index
}

setSVGTree(treeData, 0, 0, 100)
drawArray.forEach(obj => SVGContainer.el.append(obj.el))