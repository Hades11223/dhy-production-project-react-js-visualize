import React from 'react';
import Loadable from 'react-loadable';
import 'antd/dist/antd.css';
import { Switch } from 'react-router-dom';
import RouterWithPaths from '@components/RouterWithPaths';

function Loading() {
  return <div></div>;
}
function index() {
  const routers = [
    {
      path: ['/'],
      component: Loadable({
        loader: () => import('@containers/tao-duong-dan-man-hinh'),
        loading: Loading,
      }),
    },
    {
      path: ['/visualize/quay-thanh-toan-ngoai-tru'],
      component: Loadable({
        loader: () => import('@containers/visualize-quay-thanh-toan-ngoai-tru'),
        loading: Loading,
      }),
    },
    {
      path: ['/visualize'],
      component: Loadable({
        loader: () => import('@containers/visualize'),
        loading: Loading,
      }),
    },
    {
      path: ['/visualize/patients-wait'],
      component: Loadable({
        loader: () => import('@containers/visualize-patients-wait'),
        loading: Loading,
      }),
    },
    {
      path: ['/visualize/thu-ngan'],
      component: Loadable({
        loader: () => import('@containers/visualize-thu-ngan'),
        loading: Loading,
      }),
    },
    {
      path: ['/visualize/goi-so-phong-kham'],
      component: Loadable({
        loader: () => import('@containers/visualize-goi-so-phong-kham'),
        loading: Loading,
      }),
    },
    {
      path: ['/visualize/lay-so-thu-ngan'],
      component: Loadable({
        loader: () => import('@containers/lay-so-thu-ngan'),
        loading: Loading,
      }),
    },
    {
      path: ['/visualize/tiep-don'],
      component: Loadable({
        loader: () => import('@containers/visualize-tiep-don'),
        loading: Loading,
      }),
    },
    {
      path: ['/visualize-cls'],
      component: Loadable({
        loader: () => import('@containers/visualize-cls'),
        loading: Loading,
      }),
    },
    {
      path: ['/visualize/quan-ly-danh-sach-goi'],
      component: Loadable({
        loader: () => import('@containers/quan-ly-danh-sach-goi'),
        loading: Loading,
      }),
    },
  ];

  return (
    <Switch>
      {routers.map((route, key) => {
        if (route.component)
          return (
            <RouterWithPaths
              exact
              key={key}
              path={route.path}
              render={(props) => {
                return <route.component {...props} />;
              }}
            />
          );
        return null;
      })}
    </Switch>
  );
}
export default index;
