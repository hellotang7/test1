import request from "./request";
import qs from 'qs'



export const findListByTableParameter = (module: string, data: any) => {
    // @ts-ignore
    return request({
        url: `/${module}/find/list/tableParameter`,
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data),
    })
}


export const findOneById = (module: string, data: any) => {
    // @ts-ignore
    return request({
        url: `/${module}/select/one`,
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data),
    })
}


export const addIotEquipment = (module: string, data: any) => {
    // @ts-ignore
    return request({
        url: `/${module}/add/one`,
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data),
    })
}


//设备固件添加and上传功能
export const addIotEquipmentAndUploadFile = (module: string, data: any) => {
    // @ts-ignore
    return request({
        url: `/${module}/add/one`,
        method: "post",
        header: {
            "Content-type": "multipart/form-data",
        },
        timeout:300000000,
        data: data,
    })
}


export const updateById = (module: string, data: any) => {
    // @ts-ignore
    return request({
        url: `/${module}/update/id`,
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data),
    })
}
export const delById = (module: string, data: any) => {
    // @ts-ignore
    return request({
        url: `/${module}/del/id`,
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data),
    })
}


export const findLimit = ((module: string,data:any) => {
    // @ts-ignore
    return request({
        url: `/${module}/find/limit`,
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data)
    })
})



//调试
export const debug = ( data: any) => {
    // @ts-ignore
    return request({
        url: '/debug/enableReportGamma',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data),
    })
}
