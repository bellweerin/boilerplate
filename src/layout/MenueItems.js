import {
  Uil500px,
  UilAirplay,
  UilArrowGrowth,
  UilAt,
  UilBagAlt,
  UilBookAlt,
  UilBookOpen,
  UilBookReader,
  UilCalendarAlt,
  UilChartBar,
  UilChat,
  UilCheckSquare,
  
  UilCircle,
  UilClipboardAlt,
  UilClock,
  UilCompactDisc,
  UilCreateDashboard,
  UilDatabase,
  UilDocumentLayoutLeft,
  UilEdit,
  UilEnvelope,
  UilExchange,
  UilExclamationOctagon,
  // UilExpandArrowsAlt,
  UilFile,
  UilFileCheck,
  UilFileShieldAlt,
  UilHeadphones,
  UilIcons,
  UilImages,
  UilInfo,
  UilLayerGroup,
  UilMap,
  UilPresentation,
  UilQuestionCircle,
  UilSearch,
  UilServer,
  UilSetting,
  UilShoppingCart,
  UilSquareFull,
  UilTable,
  UilTool,
  UilUsdCircle,
  UilWindowSection,
  UilUsersAlt
} from '@iconscout/react-unicons';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import propTypes from 'prop-types';
import { NavTitle } from './Style';
import versions from '../demoData/changelog.json';
import { changeDirectionMode, changeLayoutMode, changeMenuMode } from '../redux/themeLayout/actionCreator';

function MenuItems({ toggleCollapsed }) {
  const { t } = useTranslation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const { topMenu } = useSelector((state) => {
    return {
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  });

  const dispatch = useDispatch();

  const path = '/admin';

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  const changeLayout = (mode) => {
    dispatch(changeLayoutMode(mode));
  };
  const changeNavbar = (topMode) => {
    const html = document.querySelector('html');
    if (topMode) {
      html.classList.add('ninjadash-topmenu');
    } else {
      html.classList.remove('ninjadash-topmenu');
    }
    dispatch(changeMenuMode(topMode));
  };
  const changeLayoutDirection = (rtlMode) => {
    if (rtlMode) {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'rtl');
    } else {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'ltr');
    }
    dispatch(changeDirectionMode(rtlMode));
  };

  const darkmodeActivated = () => {
    document.body.classList.add('dark-mode');
  };

  const darkmodeDiactivated = () => {
    document.body.classList.remove('dark-mode');
  };

  const items = [
    getItem(
      !topMenu && <NavTitle className="ninjadash-sidebar-nav-title">{t('application')}</NavTitle>,
      'app-title',
      null,
      null,
      'group',
    ),
    getItem(t('Test'), 'test', !topMenu && <UilCreateDashboard />, [
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          {t('demo')} {t('1')}
        </NavLink>,
        'demo-1',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/demo-2`}>
          {t('demo')} {t('2')}
        </NavLink>,
        'demo-2',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/demo-9`}>
          {t('demo')} {t('9')}
        </NavLink>,
        'demo-9',
        null,
      ),
     
    ]),

    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/pages/test`}>
        {t('รายการแจ้งซ่อม')}
       
      </NavLink>,
      'test1',
      !topMenu && <UilExclamationOctagon />,
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/pages/test2`}>
        {t('รายการอนุมัติ')}
       
      </NavLink>,
      'test2',
      !topMenu && < UilFileCheck />,
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/pages/test3`}>
        {t('รายการส่วนการปฏิบัติงาน')}
       
      </NavLink>,
      'test3',
      !topMenu && <UilArrowGrowth />,
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/pages/system`}>
        {t('จัดการข้อมูลระบบ')}
       
      </NavLink>,
      'system',
      !topMenu &&  <  UilSetting />,
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/pages/user`}>
        {t('จัดการข้อมูลผู้ใช้งาน')}
       
      </NavLink>,
      'user',
      !topMenu &&  <  UilUsersAlt />,
    ),
  
   

   
   
   

   
  
   
  ];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<UilEllipsisV />}
      openKeys={openKeys}
      items={items}
    />
  );
}

MenuItems.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
