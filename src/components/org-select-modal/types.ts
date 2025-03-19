export type selectType = 'department' | 'member'
export type OrgNode = {
    id: string
    name: string
    parentId: string
    type?: 'DEPARTMENT' | 'MEMBER'
    avatar?: string
    nickname?: string
    [key: string]: any
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
    nickname?: string
    [key: string]: any
}