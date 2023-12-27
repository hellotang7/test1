import request from "./request";
import qs from 'qs'

export const restart = (no: string) => {
    // @ts-ignore
    return request({
        url: '/iotEquipment/restart',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify({
            no
        })
    })
}

export const ctrlRelay = (no: string, num: number, status: boolean) => {
    // @ts-ignore
    return request({
        url: '/iotEquipment/ctrRelay',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify({
            no,
            num,
            status
        })
    })
}

//设置面板 功能设置 保存
export const saveFunctionSettings = (data: any) => {
    // @ts-ignore
    return request({
        url: '/iotEquipment/nwdSaveFunctionSettings',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data)
    })
}

//设置面版 定时设置 报保存
export const nwdSaveTimingSettings = (data: any) => {
    // @ts-ignore
    return request({
        url: '/iotEquipment/nwdSaveTimingSettings',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data)
    })
}


//设置面板 安全策略 保存

export const nwdSaveRuleSettings = (data: any) => {
    // @ts-ignore
    return request({
        url: '/iotEquipment/nwdSaveRuleSettings',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data)
    })
}


//设置面版初始化
export const getEquipmentInfo = (no: string) => {
    // @ts-ignore
    return request({
        url: '/iotEquipment/getEquipmentInfo',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify({
            no
        })
    })
}

//新设置面板初始化
export const getConfig = (no: string) => {
    // @ts-ignore
    return request({
        url: '/iotEquipment/getConfig',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify({
            no
        })
    })
}
//新设置面板保存

export const setConfig = (data: any) => {
    // @ts-ignore
    return request({
        url: '/iotEquipment/setConfig',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data)

    })
}

//初始化设备信息
export const getEzvizLive = (no: string) => {
    // @ts-ignore
    return request({
        url: '/iotEquipment/get/ezvizLive',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify({
            no
        })
    })
}

export const reportData = (data: any) => {
    // @ts-ignore
    return request({
        url: '/iotEquipment/reportData',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
        data: qs.stringify(data)

    })
}

export const powerOffAll = () => {
    // @ts-ignore
    return request({
        url: '/iotEquipment/powerOffAll',
        method: "post",
        header: {
            "Content-type": "application/json",
        },
    })
}







