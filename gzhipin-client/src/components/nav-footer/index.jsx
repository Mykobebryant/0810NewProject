import React, {Component} from 'react';
import {TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';

const Item = TabBar.Item;

class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired
  }
  
  render () {
    const {pathname} = this.props.location;
  
    const navList = this.props.navList.filter(nav => !nav.hide);
    
    return (
      <TabBar>
        {
          navList.map((item, index) => (<Item
            key={index}
            title={item.text}
            icon={{uri: require(`./images/${item.icon}.png`)}}
            selectedIcon={{uri: require(`./images/${item.icon}-selected.png`)}}
            selected={pathname === item.path}
            onPress={() => this.props.history.replace(item.path)}
            badge={item.path === '/message' ? this.props.unReadCount : 0}
          />))
        }
      </TabBar>
    )
  }
}

export default NavFooter;  //将当前组件包装成路由组件返回，就有三个属性