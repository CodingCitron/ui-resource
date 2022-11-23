import { treeData } from './data.js'
import { SVGMaker } from './make-svg.js'

const container = document.querySelector('.svg-container')

const SVGContainer = new SVGMaker({
    nodeName: 'svg',
    style: {
        width: '1000',
        height: '1000'
    },
    viewBox: [-20, -25, 1000, 1000]
})

container.append(SVGContainer.el)

/*
1. 선을 만든다.
2. 간격을 준다.
*/
const svgs = []

function setSVGTree(data, startX, startY, interval, depth) {
    const style = {
        stroke: `red`,
        strokeWidth: `3px`
    }

    startX = startX || 0
    startY = startY || 0
    depth = depth || 0
    
    let childLength = 0

    for(let i = 0; i < data.length; i++) {
        const value = data[i]

        let x = startX * interval
        let ylength = (startY + i + childLength)
        let y = ylength * interval 

        console.log(y)
        draw(x, y, interval, 0, style)
        drawText(x, y - 10, data[i].name, { fontSize: '20px' })
        
        if(!Object.prototype.hasOwnProperty.call(value, 'children')) continue
        if(value.children.length === 0) continue 

        // 자식 그리기
        const yValue = setSVGTree(value.children, startX + 1, ylength, interval, style)
        childLength += value.children.length

        // x = (startX + 1) * interval
        // const drawYLength = childLength + yValue - 1
        // console.log(x, y)
        // console.log(drawYLength)
        // const index = draw(x, y, 0, drawYLength * interval, style)
        // console.log(drawArray[index - 1].el)
    }

    // // Y줄
    // if(depth !== 0) {
    //     let x = startX * interval
    //     let y = (startX - 1) * interval

    //     console.log(startX, y, drawYLength)
    //     const index = draw(x, y, 0, drawYLength * interval, style)

    //     console.log(drawArray[index - 1].el)
    // } // 

    return childLength
}

function hasProp(obj, prop){
    return Object.prototype.hasOwnProperty.call(obj, prop)
}

function treeDraw(data, x, y, interval){

    const style = {
        stroke: 'red',
        strokeWidth: '3px',
    }

    function recursion(data, x, y, interval, style) {
        let height = 0
        // let repo = []

        if(!Array.isArray(data)) {
            // 루트 그리기
            console.log(data)

            if(hasProp(obj, 'children')) {
                return recursion(obj.children)
            }
        }  

        data.forEach(obj => {
            drawText(
                x * interval, 
                (y + height) * interval - 10, 
                obj.id, 
                { fontSize: '10px' }
            )

            if(hasProp(obj, 'children')) {
                draw(
                    x * interval, 
                    (y + height) * interval, 
                    interval, 
                    0, 
                    style
                )

                height++

                if(obj.children.length === 0) return 
                    const value = recursion(
                        obj.children, 
                        x + 1, 
                        (y + height - 1), 
                        interval, 
                        style
                    )

                    console.log(value)
                    height += value

                draw(
                    (x + 1) * interval, 
                    y * interval, 
                    0, 
                    interval * (y + value - 1), 
                    style
                )
            }
        })

        return height
    }

    recursion(data, x, y, interval, style)
}

function draw(x, y, endX, endY, style){
    const index = svgs.push(
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

function drawText(x, y, text, style){
    const index = svgs.push(
        new SVGMaker({
            nodeName: 'text',
            text: text,
            style: {
                x: x,
                y: y,
                stroke: `${style.stroke}`,
                'stroke-width': `${style.strokeWidth}`,
                fill: `${style.fill}`
            }
        })
    )

    return index
}

treeDraw(treeData, 0, 0, 50)    

// setSVGTree(treeData, 0, 0, 100)
svgs.forEach(obj => SVGContainer.el.append(obj.el))