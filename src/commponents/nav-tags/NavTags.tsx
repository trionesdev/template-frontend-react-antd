import {NavRouteObject} from './types';
import {FC, useEffect, useRef, useState} from 'react';
import {generatePath, useMatches, useNavigate, useParams} from '@trionesdev/commons-react';
import {Tag} from 'antd';
import {HomeOutlined} from '@ant-design/icons';
import _ from 'lodash';
import {useCssInJs} from '@trionesdev/antd-react-ext';

import classNames from 'classnames';
import {genNavTagsStyle} from "./styles.ts";
import {routes} from "../../router";
import {RouteConstants} from "../../router/route.constants.ts";


export const routeMatch = (id: string): NavRouteObject | undefined => {
    const pageGroupIds = [RouteConstants.USER_CENTER.LAYOUT.id]
    const match = (id: string, routes: NavRouteObject[], parentPageRoute?: NavRouteObject): NavRouteObject | undefined => {
        for (let i = 0; i < routes.length; i++) {
            let pageRoute = parentPageRoute ? {...parentPageRoute} : undefined;
            if (pageGroupIds.includes(routes[i].id || '')) {
                pageRoute = routes[i]
            }
            if (routes[i].id === id) {
                return _.assign(routes[i], {pageRoute})
            }
            const children = routes[i].children
            if (children) {
                const result = match(id, children, pageRoute)
                if (result) {
                    return result
                }
            }
        }
    }
    return match(id, routes, undefined)
}


type NavTagsProps = {}
export const NavTags: FC<NavTagsProps> = ({}) => {
    const params = useParams();
    const homeRoute = {id: 'home', label: '首页', path: () => '/'}; //此处的路由对象是自己设置的，要跟路由表对应上，由于匹配是根据ID的，记得路由配置要加上id
    const tagsMenuRef = useRef<any>();
    const tagsMenuWrapperRef = useRef<any>();
    const navigate = useNavigate();
    const [routeObjects, setRouteObjects] = useState<NavRouteObject[]>([homeRoute]);
    const [activeRouteObject, setActiveRouteObject] = useState<NavRouteObject | undefined>(homeRoute);
    const [translateX, setTranslateX] = useState<number>(0);
    const matches = useMatches();

    useEffect(() => {
        const routeId = matches[matches.length - 1].id;
        const currentRouteObject = routeObjects.find(item => item.id === routeId);
        if (currentRouteObject) {
            setActiveRouteObject(currentRouteObject);
        } else {
            const matchRoute = routeMatch(routeId);
            if (matchRoute) {
                if (matchRoute.pageRoute) {
                    const matchPageRoute = routeObjects.find(item => item.pageRoute?.id === matchRoute.pageRoute?.id)
                    if (matchPageRoute) {
                        const newRouteObjects = routeObjects.map(route => {
                            if (route.pageRoute?.id === matchPageRoute.pageRoute?.id) {
                                return {...matchRoute, params}
                            } else {
                                return route;
                            }
                        })
                        setRouteObjects(newRouteObjects)
                    } else {
                        setRouteObjects([...routeObjects, {...matchRoute, params}]);
                    }
                } else {
                    setRouteObjects([...routeObjects, {...matchRoute, params}]);
                }
                setActiveRouteObject(matchRoute);
            }
        }
    }, [matches]);

    const prefixCls = `triones-nav-tags`;
    const {wrapSSR, hashId} = useCssInJs({prefix: prefixCls, styleFun: genNavTagsStyle});

    return wrapSSR(
        <div ref={tagsMenuRef} className={classNames(prefixCls, hashId)} onWheel={(e) => {
            const tagsMenuEl = tagsMenuRef.current;
            const tagsMenuWrapperEl = tagsMenuWrapperRef.current;
            if (tagsMenuEl.clientWidth >= tagsMenuWrapperEl.clientWidth) {
                return;
            } else {
                const maxTranslateX = tagsMenuWrapperEl.clientWidth - tagsMenuEl.clientWidth;
                let nextTranslateX = translateX;
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
                setTranslateX(nextTranslateX);
                tagsMenuWrapperEl.style.transform = `translateX(${nextTranslateX}px)`;
            }
        }}>
            <div ref={tagsMenuWrapperRef} className={classNames(`${prefixCls}-wrapper`, hashId)}>
                {routeObjects.map((item: NavRouteObject) => <Tag key={item.id}
                                                                 className={item?.id === activeRouteObject?.id ? 'active-tag' : ''}
                                                                 icon={item.id == homeRoute.id ?
                                                                     <HomeOutlined/> : false}
                                                                 closable={item.id !== homeRoute.id}
                                                                 onClose={() => {
                                                                     const newRouteObjects = routeObjects.filter(route => route.id !== item?.id);
                                                                     setRouteObjects(newRouteObjects);
                                                                     if (item.id === activeRouteObject?.id) {
                                                                         let newRoute = null;
                                                                         if (_.isEmpty(newRouteObjects)) {
                                                                             newRoute = homeRoute;
                                                                         } else {
                                                                             newRoute = newRouteObjects[newRouteObjects.length - 1];
                                                                         }
                                                                         setActiveRouteObject(newRoute);
                                                                         const path = _.isFunction(newRoute.path) ? newRoute.path() : newRoute.path;
                                                                         navigate(generatePath(path!, item?.params));
                                                                     }
                                                                 }}
                                                                 onClick={() => {
                                                                     const path = _.isFunction(item.path) ? item.path() : item.path;
                                                                     navigate(generatePath(path!, item?.params));
                                                                 }}
                >{item?.pageRoute?.label || item.label}</Tag>)}
            </div>
        </div>,
    );
};