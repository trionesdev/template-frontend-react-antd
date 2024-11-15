import {Outlet, RouteObject, useAuth, useMatches, useNavigate} from "@trionesdev/commons-react";
import {Avatar, Button, Dropdown, Layout, Menu, Space, Tag} from "antd";
import styles from "./standalone-layout.module.less"
import {
    ApartmentOutlined,
    DatabaseOutlined,
    DesktopOutlined, HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined, MenuUnfoldOutlined,
    UserOutlined
} from "@ant-design/icons";
import {RouteConstants} from "../../router/route.constants.ts";
import {useEffect, useRef, useState} from "react";
import {routeMatch} from "../../router";
import _ from "lodash";

const TagsMenu = () => {
    const homeRoute = {id: 'home', label: '首页', path: () => '/'} //此处的路由对象是自己设置的，要跟路由表对应上，由于匹配是根据ID的，记得路由配置要加上id
    const tagsMenuRef = useRef<any>()
    const tagsMenuWrapperRef = useRef<any>()
    const navigate = useNavigate()
    const [routeObjects, setRouteObjects] = useState<RouteObject[]>([homeRoute])
    const [activeRouteObject, setActiveRouteObject] = useState<RouteObject | undefined>(homeRoute)
    const [translateX, setTranslateX] = useState<number>(0)
    const matches = useMatches()

    useEffect(() => {
        const routeId = matches[matches.length - 1].id;
        const currentRouteObject = routeObjects.find(item => item.id === routeId);
        if (currentRouteObject) {
            setActiveRouteObject(currentRouteObject)
        } else {
            const matchRoute = routeMatch(routeId)
            if (matchRoute) {
                setRouteObjects([...routeObjects, matchRoute])
                setActiveRouteObject(matchRoute)
            }
        }
    }, [matches])

    return <div ref={tagsMenuRef} className={styles.standaloneLayoutTagsMenu} onWheel={(e) => {
        const tagsMenuEl = tagsMenuRef.current
        const tagsMenuWrapperEl = tagsMenuWrapperRef.current
        if (tagsMenuEl.clientWidth >= tagsMenuWrapperEl.clientWidth) {
            return
        } else {
            const maxTranslateX = tagsMenuWrapperEl.clientWidth - tagsMenuEl.clientWidth
            let nextTranslateX = translateX
            if (e.deltaY < 0) { //向左
                if (translateX + e.deltaY < -maxTranslateX) {
                    nextTranslateX = -maxTranslateX;
                } else {
                    nextTranslateX = translateX + e.deltaY;
                }
            } else if (e.deltaY > 0) { //向右
                if (translateX + e.deltaY > 0) {
                    nextTranslateX = 0;
                } else {
                    nextTranslateX = translateX + e.deltaY;
                }
            }
            setTranslateX(nextTranslateX)
            tagsMenuWrapperEl.style.transform = `translateX(${nextTranslateX}px)`
        }
    }}>
        <div ref={tagsMenuWrapperRef} className={styles.standaloneLayoutTagsMenuWrapper}>
            {routeObjects.map((item: RouteObject) => <Tag key={item.id}
                                                          className={item?.id === activeRouteObject?.id ? 'active-tag' : ''}
                                                          icon={item.id == homeRoute.id ? <HomeOutlined/> : false}
                                                          closable={item.id !== homeRoute.id}
                                                          onClose={() => {
                                                              const newRouteObjects = routeObjects.filter(route => route.id !== item?.id)
                                                              setRouteObjects(newRouteObjects)
                                                              let newRoute = null
                                                              if (_.isEmpty(newRouteObjects)) {
                                                                  newRoute = homeRoute
                                                              } else {
                                                                  newRoute = newRouteObjects[newRouteObjects.length - 1]
                                                              }
                                                              setActiveRouteObject(newRoute)
                                                              const path = _.isFunction(newRoute.path) ? newRoute.path() : newRoute.path
                                                              navigate(path!)
                                                          }}
                                                          onClick={() => {
                                                              const path = _.isFunction(item.path) ? item.path() : item.path
                                                              navigate(path!)
                                                          }}
            >{item.label}</Tag>)}
        </div>
    </div>
}

export const StandAloneLayout = () => {
    const navigate = useNavigate()

    const {actor, signOut} = useAuth()
    const [collapsed, setCollapsed] = useState(false)

    const menuItems: any[] = [
        {
            key: 'org',
            label: '组织管理',
            icon: <ApartmentOutlined/>,
            children: [
                {
                    key: RouteConstants.ORG.MEMBERS.id,
                    label: RouteConstants.ORG.MEMBERS.label,
                    onClick: () => navigate(RouteConstants.ORG.MEMBERS.path!())
                },
                {
                    key: RouteConstants.ORG.DEPARTMENTS.id,
                    label: RouteConstants.ORG.DEPARTMENTS.label,
                    onClick: () => navigate(RouteConstants.ORG.DEPARTMENTS.path!())
                },
                {
                    key: RouteConstants.ORG.ORG_STRUCTURE.id,
                    label: RouteConstants.ORG.ORG_STRUCTURE.label,
                    onClick: () => navigate(RouteConstants.ORG.ORG_STRUCTURE.path())
                },
                {
                    key: RouteConstants.ORG.ROLES.id,
                    label: RouteConstants.ORG.ROLES.label,
                    onClick: () => navigate(RouteConstants.ORG.ROLES.path())
                }
            ]
        },
        {
            key: 'dic',
            label: '数据字典',
            icon: <DatabaseOutlined/>,
            children: [
                {
                    key: RouteConstants.DIC.DICTIONARIES.id,
                    label: RouteConstants.DIC.DICTIONARIES.label,
                    onClick: () => navigate(RouteConstants.DIC.DICTIONARIES.path!())
                },
                {
                    key: RouteConstants.DIC.COUNTRIES.id,
                    label: RouteConstants.DIC.COUNTRIES.label,
                    onClick: () => navigate(RouteConstants.DIC.COUNTRIES.path!())
                },
                {
                    key: RouteConstants.DIC.DISTRICTS.id,
                    label: RouteConstants.DIC.DISTRICTS.label,
                    onClick: () => navigate(RouteConstants.DIC.DISTRICTS.path!())
                },
            ]
        },
        {
            key: 'sys',
            label: '系统管理',
            icon: <DesktopOutlined/>,
            children: [
                {
                    key: RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.id,
                    label: RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.label,
                    onClick: () => navigate(RouteConstants.BOSS.PERM.FUNCTIONAL_RESOURCES.path!())
                },
                {
                    key: RouteConstants.BASE.CODE_FORMAT_RULES,
                    label: RouteConstants.BASE.CODE_FORMAT_RULES.label,
                    onClick: () => navigate(RouteConstants.BASE.CODE_FORMAT_RULES.path!())
                },
                {
                    key: RouteConstants.LOG.OPERATION_LOGS.id,
                    label: RouteConstants.LOG.OPERATION_LOGS.label,
                    onClick: () => navigate(RouteConstants.LOG.OPERATION_LOGS.path!())
                }
            ]
        }
    ]

    return <Layout className={styles.standaloneLayout}>
        <Layout.Sider collapsed={collapsed}>
            <div className={styles.standaloneLayoutSiderWraper}>
                <div className={styles.logo}>TrionesDev</div>
                <div className={styles.menu}>
                    <Menu mode="inline" theme={'dark'} items={menuItems}/>
                </div>
            </div>
        </Layout.Sider>
        <Layout>
            <Layout.Header className={styles.standaloneLayoutHeader}>
                <Button type={'text'} icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}/>
                <Space>
                    <Dropdown menu={{
                        items: [
                            {
                                key: `profile`,
                                label: `个人中心`,
                                icon: <UserOutlined/>,
                                onClick: () => {
                                    navigate(RouteConstants.USER_CENTER.PROFILE.path!())
                                }
                            },
                            {
                                key: `logout`,
                                label: `退出登录`,
                                icon: <LogoutOutlined/>,
                                onClick: () => {
                                    signOut?.()
                                }
                            }
                        ]
                    }}>
                        <Space style={{cursor: "default"}}><Avatar icon={<UserOutlined/>} src={actor?.avatar}/>
                            <span>{actor?.nickname}</span>
                        </Space>
                    </Dropdown>
                </Space>
            </Layout.Header>
            <TagsMenu/>
            <Layout.Content style={{overflowY: "auto", padding: 4}}>
                <Outlet/>
            </Layout.Content>
        </Layout>
    </Layout>
}