export type selectMode = 'department' | 'member'
export type OrgNode = {
    id: string
    name: string
    parentId: string
    type?: 'DEPARTMENT' | 'MEMBER'
    avatar?: string
}

export type OrgLevel = {
    id: string
    name: string
}

export type OrgLevelFieldNames = {
    id?: string,
    name?: string
}
export type OrgNodeFieldNames = {
    id?: string,
    name?: string
    parentId?: string
    type?: string
    avatar?: string
}