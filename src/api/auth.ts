import request from '@/api/request';
import qs from 'qs';





//登录接口
export const loginUserByUsernameAndPassword = (data: any) => {
    // @ts-ignore
    return request({
        url: '/auth/loginUserByUsernameAndPassword',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data),
    })
}
//修改密码
export const updateUserPassword = (data: any) => {
    // @ts-ignore
    return request({
        url: '/auth/updateUserPassword',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data),
    })
}
//修改昵称
export const updateUserInfo= (data: any) => {
    // @ts-ignore
    return request({
        url: '/auth/updateUserInfo',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data),
    })
}

//修改头像
export const uploadAvatar = (data: any) => {
    // @ts-ignore
    return request({
        url: '/auth/uploadAvatar',
        method: "post",
        header: {
            "Content-type": "multipart/form-data",
        },
        data: data
    })
}





//用户信息获取
export const currentUserInfo = () => {
    // @ts-ignore
    return request({
        url: '/auth/currentUserInfo',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
    })
}

//登出
//
export const logout = () => {
    // @ts-ignore
    return request({
        url: '/auth/logout',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
    })
}

//权限信息获取
export const findTree = () => {
    // @ts-ignore
    return request({
        url: '/permission/find/tree',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
    })
}
