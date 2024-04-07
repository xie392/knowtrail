import { ref } from 'vue'

export interface TreeOptions {
    id: string
    p_id: string
    children?: TreeOptions[]
    [key: string]: any
}

export const useTree = (items: TreeOptions[]) => {
    /**
     * 将输入数据数组转换为树结构
     *
     * @param {Tree[]} data -Tree 对象的输入数组
     * @return {Tree[]} 生成的树结构
     */
    const convertToTree = (data: TreeOptions[]) => {
        const result = []
        const map: TreeOptions = { id: '', p_id: '', children: [] }
        for (const item of data) {
            map[item.id] = { ...item, children: [], label: item.title, value: item.id }
        }
        for (const item of data) {
            const parent = map[item.p_id]
            if (parent) {
                parent.children.push(map[item.id])
            } else {
                result.push(map[item.id])
            }
        }
        return result
    }

    // trees = convertToTree(items)

    // return {
    //     trees: trees.value
    // }
}

/**
 * 在给定的树数组中查找特定的树，并将提供的树数据作为子树添加到找到的树中。
 *
 * @param {TreeOptions[]} trees -要搜索的树数组
 * @param {TreeOptions} data -要作为子项添加的树数据
 */
const findTree = (trees: TreeOptions[], data: TreeOptions) => {
    for (let i = 0; i < trees.length; i++) {
        const element = trees[i]
        if (element.id === data.p_id) {
            if (!element.children) element.children = []
            element.children.push(data)
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
    if (!item.p_id) {
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
    const map: TreeOptions = { id: '', p_id: '', children: [] }
    for (const item of data) {
        map[item.id] = { ...item, children: [], label: item.title, value: item.id }
    }
    for (const item of data) {
        const parent = map[item.p_id]
        if (parent) {
            parent.children.push(map[item.id])
        } else {
            result.push(map[item.id])
        }
    }
    return result
}
