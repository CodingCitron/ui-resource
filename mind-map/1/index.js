import { treeData } from './data.js'
import { SVGMaker } from './make-svg.js'

const container = document.querySelector('.svg-container')

const SVGContainer = new SVGMaker({
    nodeName: 'svg',
    style: {
        width: '500',
        height: '500'
    },
    viewBox: [-20, -25, 600, 600]
})

container.append(SVGContainer.el)


const procession = [

]

function treeToProcession(data){

}


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

        data.forEach((obj, index) => {
            let value = 0
            // console.log(height)
            drawText (
                x * interval, 
                (y + height) * interval - 10, 
                obj.id, 
                { fontSize: '10px' }
            )

            // const yDrawObj = draw(
            //     x * interval, 
            //     (y + height) * interval, 
            //     0, 
            //     (y + height + 1) * interval,
            //     style
            // )

            if(hasProp(obj, 'children')) {
                height++

                if(obj.children.length !== 0) { 

                    // 자식이 있는 경우에만 그린다. 
                    // xDraw
                    const xDrawObj = draw (
                        x * interval, 
                        (y + height - 1) * interval, 
                        interval, 
                        0, 
                        style
                    )
                    
                    value = recursion (
                        obj.children, 
                        x + 1, 
                        (y + height - 1), 
                        interval, 
                        style
                    )
                    const temp = height
                    height-- 
                    
                    let endpoint = interval * (value - 1)
                    
                    // console.log(data[index + 1])

                    if(!(
                        data[index + 1] && 
                        data[index + 1].children.length === 0
                        )
                    ) { // 마지막 위치
                        const { m, l } = xDrawObj.d
                        const yStart = parseInt(m.split(' ')[1])

                        const afterStage = data[index + 1] && data[index + 1].children.length
                        const childLength = data[index].children.length
                        endpoint = (childLength - 1) * interval

                        // if(afterStage) {
                        //     // endpoint = afterStage * interval
                        //     console.log(afterStage === childLength)
                        //     console.log(afterStage)
                        //     console.log(childLength)
                        //     console.log(endpoint)
                        //     console.log(temp)

                        //     // if(afterStage > childLength) {
                        //     //     endpoint = (afterStage - 1) * interval
                        //     // } else {
                        //     //     endpoint = (childLength - 1) * interval
                        //     // }
                        //     console.log(obj)
                        //     endpoint = ((afterStage - 1) + (childLength - 1)) * interval
                        // }

                        const yDrawObj = draw(
                            (x + 1) * interval, 
                            yStart, 
                            0, 
                            endpoint,
                            style
                        )
                        console.log(yDrawObj.el)
                    } 
                
                    height += value
                }
            }
        })

        return height
    }

    recursion(data, x, y, interval, style)
}

function draw(x, y, endX, endY, style){
    const length = svgs.push(
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

    return svgs[length - 1]
}

function drawText(x, y, text, style){
    const length = svgs.push(
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

    return svgs[length - 1]
}

treeDraw(treeData, 0, 0, 100)    

// setSVGTree(treeData, 0, 0, 100)
svgs.forEach(obj => SVGContainer.el.append(obj.el))