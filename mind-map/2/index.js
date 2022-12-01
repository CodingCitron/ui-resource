
const data = {
    "name": "나이트 소드",
    "children": [
    { "name": "나이트 소드 1",
      "children": [
          { "name": "새로운 시작" },
        ]
      },
      { 
        "name": "나이트 소드 2",
        "children": [
          { "name": "마력을 느끼고 영지를 지키다" },
        ]
      },
      { "name": "나이트 소드 3",
      "children": [
          { "name": "죽음의 검술" },
          { "name": "화염의 검술 1", 
            "children": [
              { "name": "소드 마스터의 검술" },
              { "name": "소드 마스터의 검술2" },
              { "name": "소드 마스터의 검술3" }
            ]
          },
          { "name": "얼음의 검술 2" },
          { "name": "풀의 검술 3" }
        ]
      },
      { 
        "name": "나이트 소드 4",
        "children": [
          { "name": "기사단의 위험" },
        ]
      },
      { "name": "나이트 소드 5",
      "children": [
          { "name": "기사단장의 실력" }
        ]
      },
      { 
        "name": "나이트 소드 6",
        "children": [
          { "name": "죽음의 꿈" }
        ]  
      }
    ]
}

const mindmapContainer = document.querySelector('.mindmap-container')
const rectSize = {
  height: 30,
  width: 120,
}

const basicSpace = {
  padding: 30,
  height: 50,
  width: 150,
}

const sampleData = data

const root = d3.hierarchy(sampleData)
const tree = d3.tree()

tree(root)
root.count()

const height =
  root.value * rectSize.height +
  (root.value - 1) * (basicSpace.height - rectSize.height) +
  basicSpace.padding * 2

const width =
  (root.height + 1) * rectSize.width +
  root.height * (basicSpace.width - rectSize.width) +
  basicSpace.padding * 2

const svg = d3.select(mindmapContainer) // 선택
              .append('svg') // svg 생성
              .attr('width', width)
              .attr('height', height)

const seekParent = (currentData, name) => {
  const crntHrcy = currentData.parent.children
  const target = crntHrcy.find((contents) => contents.data.name == name)
  return target ? { name: name, hierarchy: crntHrcy } : seekParent(currentData.parent, name)
}

const calcLeaves = (names, currentData) => {
  const eachHierarchies = names.map((name) => seekParent(currentData, name))
  console.log(eachHierarchies)
  const eachIdxes = eachHierarchies.map((item) =>
    item.hierarchy.findIndex((contents) => contents.data.name == item.name)
  )

  const filteredHierarchies = eachHierarchies.map((item, idx) =>
    item.hierarchy.slice(0, eachIdxes[idx])
  )

  const values = filteredHierarchies.map((hierarchy) => hierarchy.map((item) => item.value))
  return values.flat()
}

const defineY = (data, spaceInfo) => {
  const ancestorValues = data.ancestors().map((item) => item.data.name)
  const leaves = calcLeaves(ancestorValues.slice(0, ancestorValues.length - 1), data)
  const sumLeaves = leaves.reduce((previous, current) => previous + current, 0)
  return sumLeaves * spaceInfo.height + spaceInfo.padding
}

const definePos = (treeData, spaceInfo) => {
  treeData.each((d) => {
    d.x = d.depth * spaceInfo.width + spaceInfo.padding
    d.y = defineY(d, spaceInfo)
  })
}
definePos(root, basicSpace)

const g = svg.append('g')

g.selectAll(".link")
  .data(root.descendants().slice(1))
  .enter()
  .append("path")
  .attr("class", "link")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("d", (d) =>
    `M${d.x},${d.y}
    L${d.parent.x + rectSize.width + (basicSpace.width - rectSize.width) / 2},${d.y}
    ${d.parent.x + rectSize.width + (basicSpace.width - rectSize.width) / 2},${d.parent.y}
    ${d.parent.x + rectSize.width},${d.parent.y}`
      .replace(/\r?\n/g, '')
      .replace(/\s+/g, ' ')
  )
  .attr('transform', (d) => `translate(0, ${rectSize.height / 2})`)

const node = g
  .selectAll('.node')
  .data(root.descendants())
  .enter()
  .append('g')
  .attr('class', 'node')
  .attr('transform', (d) => `translate(${d.x}, ${d.y})`)

node
  .append("rect")
  .attr("width", rectSize.width)
  .attr("height", rectSize.height)
  .attr("fill", "#fff")
  .attr("stroke", "black")

node
  .append('text')
  .text((d) => d.data.name)
  .attr("transform", `translate(5, 15)`)