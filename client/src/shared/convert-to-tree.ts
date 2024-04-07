export interface TreeOptions {
    id: string
    pid: string
    children?: TreeOptions[]
    [key: string]: any
}

/**
 * 在给定的树数组中查找特定的树，并将提供的树数据作为子树添加到找到的树中。
 *
 * @param {TreeOptions[]} trees -要搜索的树数组
 * @param {TreeOptions} data -要作为子项添加的树数据
 */
const findTree = (trees: TreeOptions[], data: TreeOptions, is_update = false) => {
    for (let i = 0; i < trees.length; i++) {
        const element = trees[i]
        if (element.id === data.pid) {
            if (!element.children) element.children = []
            // is_update ? Object.assign(element, data) : element.children.push(data)
            if (is_update) {
                console.log('更新', element, data)
            } else {
                element.children.push(data)
            }
            return
        }
        if (element.children && element.children.length > 0) findTree(element.children, data)
    }
}

/**
 * 添加数据，找到其父元素，添加到 trees， 如果没有父元素，添加到 trees 最外层
 *
 * @param {TreeOptions} item
 * @returns
 */
export const addDataToTree = (trees: TreeOptions[], item: TreeOptions) => {
    if (!item.pid) {
        return trees.push(item)
    }
    findTree(trees, item)
}

/**
 * 将给定的 TreeOptions 数组转换为树结构。
 *
 * @param {TreeOptions[]} data -要转换的TreeOptions数组
 * @return {any} 结果树结构
 */
export const convertToTree = (data: TreeOptions[]) => {
    const result = []
    const map: TreeOptions = { id: '', pid: '', children: [] }
    for (const item of data) {
        map[item.id] = { ...item, children: [], label: item.title, value: item.id }
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

/**
 * 更新树
 * @param {TreeOptions[]} trees
 * @param {TreeOptions} data
 */
export const updateTree = (trees: TreeOptions[], data: TreeOptions) => {
    const items = [...trees]
    findTree(items, data, true)
    return items
}
