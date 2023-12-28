import { closeToast, showLoadingToast } from 'vant';

// 封装函数
export function loading(isLoading) {
  if (isLoading) {
    showLoadingToast({
      duration: 0,
      message: '加载中...',
      forbidClick: true,
      overlay:true

    });
  } else {
    closeToast(true);
  }
}
