import toast from 'react-hot-toast';

import { API_USER_INFO, API_USER_LOGIN, API_USER_REGISTER } from './const';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// 导入 UTC 插件
dayjs.extend(utc);

interface IUserInfo {
  username: string;
  password: string;
  email: string;
}

interface IUserLoginInfo {
  username: string;
  password: string;
}

// 注册用户
export const userRegisterApi = async (userInfo: IUserInfo) => {
  let response;

  // 获取当前时间并转换为 UTC 时间
  const utcTime = dayjs().utc();
  // 格式化时间为字符串，按照后端接口的要求使用了 'YYYY-MM-DD HH:mm:ss' 格式
  const createTime = utcTime.format('YYYY-MM-DD HH:mm:ss');

  try {
    response = await fetch(API_USER_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: '',
        create_time: createTime,
        remark: '',
        user_type: 0,
        ...userInfo,
      }),
    });
    console.log({ response });
  } catch (error: unknown) {
    toast.error('Error registering user!');
    throw error;
  }

  if (!response.ok) {
    toast.error(response.statusText);
    return {
      id: null,
    };
  }
  const data = await response.json();
  if (!data) {
    toast.error('Error registering user!');
    return {
      id: null,
    };
  }
  return data;
};

// 用户登录
export const userLoginApi = async (userInfo: IUserLoginInfo) => {
  let response;

  try {
    response = await fetch(API_USER_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    console.log({ response });
  } catch (error: unknown) {
    toast.error('Error registering user!');
    throw error;
  }

  if (!response.ok) {
    toast.error(response.statusText);
    return {
      id: null,
    };
  }
  const data = await response.json();
  if (!data) {
    toast.error('Error registering user!');
    return {
      id: null,
    };
  }
  return data;
};

// 获取用户信息
export const getUserInfoApi = async (user_id: string) => {
  let response;

  try {
    response = await fetch(API_USER_INFO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id }),
    });
  } catch (error: unknown) {
    toast.error('Error getting user info!');
    throw error;
  }

  if (!response.ok) {
    toast.error(response.statusText);
    return {
      id: null,
    };
  }
  const data = await response.json();
  if (!data) {
    toast.error('Error getting user info!');
    return {
      id: null,
    };
  }
  return data;
};
