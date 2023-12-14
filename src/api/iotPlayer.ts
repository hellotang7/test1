import request from '@/api/request';
import qs from 'qs';

//媒体上传文件
export const uploadFile = (data: any) => {
    // @ts-ignore
    return request({
        url: '/playerMedium/upload/file',
        method: "post",
        header: {
            "Content-type": "multipart/form-data",
        },
        data: data,
        timeout: 100000000000,
    })
}

//修改播放器关联节目接口
export const relatedPrograms = (data: any) => {
    // @ts-ignore
    return request({
        url: '/playerProgram/update/playerProgram/no',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data)

    })
}
//查询播放器关联节目接口
export const findPlayerProgramNo = (no: any) => {
    // @ts-ignore
    return request({
        url: '/playerProgram/find/playerProgram/no',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(no)

    })
}
//清单和节目保存接口
export const updateByIdPlayList = (module: string, data: any) => {
    // @ts-ignore
    return request({
        url: `/${module}/update/id`,
        method: "post",
        header: {
        },
        data,
    })
}
//播放器通用接口(屏幕尺寸、音频、清除媒体资源、屏幕控制)
export const PlayerAutoPort = (module:any,data: any) => {
    // @ts-ignore
    return request({
        url: `/iotEquipment/${module}`,
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data)
    })
}
