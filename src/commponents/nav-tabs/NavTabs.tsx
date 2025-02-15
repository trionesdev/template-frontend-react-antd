import {generatePath, useMatches, useNavigate, useParams} from "@trionesdev/commons-react";
import {useEffect, useState} from "react";
import {NavRouteObject} from "../nav-tags/types.ts";
import {Tabs} from "antd";
import {routeMatch} from "../nav-tags/NavTags.tsx";
import _ from "lodash";
import {HomeOutlined} from "@ant-design/icons";

export const NavTabs = () => {
    const params = useParams();
    const homeRoute = {id: 'home', label: '首页', path: () => '/'}; //此处的路由对象是自己设置的，要跟路由表对应上，由于匹配是根据ID的，记得路由配置要加上id
    const navigate = useNavigate();
    const [routeObjects, setRouteObjects] = useState<NavRouteObject[]>([homeRoute]);
    const [activeRouteObject, setActiveRouteObject] = useState<NavRouteObject | undefined>(homeRoute);
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

    useEffect(() => {

    }, [activeRouteObject]);

    const tabItems: any[] = routeObjects?.map((routeObject) => {
        const isHome = routeObject.id === homeRoute.id;
        return {
            icon: isHome ? <HomeOutlined/> : undefined,
            key: routeObject.id,
            label: routeObject.label,
            closable: !isHome,
        }
    })


    return <div style={{backgroundColor: 'white'}}>
        <Tabs size={`small`} type="editable-card" hideAdd={true} activeKey={activeRouteObject?.id} items={tabItems}
              onTabClick={(key) => {
                  const item = routeObjects.find(item => item.id === key);
                  if (item) {
                      const path = _.isFunction(item.path) ? item.path() : item.path;
                      navigate(generatePath(path!, item?.params));
                  }
              }}
              onEdit={(e, action) => {
                  console.log(e, action)
                  if (action === 'remove') {
                      const item = routeObjects.find(item => item.id === e);
                      if (item) {
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
                      }

                  }
              }}
        />
    </div>
}