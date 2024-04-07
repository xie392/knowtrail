const data = [
    { id: 1, pid: null,children:[] },
    { id: 2, pid: 1 },
    { id: 3, pid: null },
    { id: 4, pid: 2 },
    { id: 5, pid: null },
    { id: 6, pid: 5 },
    { id: 7, pid: null },
]

const tree = (data) => {
    const result = []
    const map = {}
    for (const item of data) {
        map[item.id] = { ...item, children: [] }
    }
    for (const item of data) {
        const parent = map[item.pid]
        if (parent) {
            parent.children.push(map[item.id])
        } else {
            result.push(map[item.id])
        }
    }
    return result
}

// { id: 7, pid: 2 },
const findTree = (thisTree,data)=>{
    for (let i = 0; i < thisTree.length; i++) {
        const element = thisTree[i];
        if (element.id === data.pid){
            element.children.push(data)
            return thisTree
        }
        if(element.children.length>0){
            findTree(element.children,data)
        }
    }
}

// console.log(JSON.stringify(tree(data),null,2));

const ta = tree(data)
console.log(findTree(ta,{ id: 8, pid: 6 }));
console.log(JSON.stringify(ta,null,2));



