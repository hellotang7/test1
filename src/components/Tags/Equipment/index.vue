<template>
  <div class='equipment'>
    <Title :dynamicTitle="'设备管理'" :showLeftButton="true" :showRightButton="true" RightButtonText='一键断电'   @click-right="powerOffWithOneClick"/>

<!--    <MyNavBar :dynamicTitle="pageTitle" :showLeftButton="true" :showRightButton="true" />-->

    <van-dropdown-menu ref='menuRef'>
      <van-dropdown-item v-model='value' :options='options' />
      <van-dropdown-item title='筛选'>

        <van-field v-model='filteringDataForms.no' label='设备编号' placeholder='输入编号' />
        <van-field v-model='filteringDataForms.name' label='设备名称' placeholder='输入名称' />
        <MyPicker v-model='filteringDataForms.workStatus' :label="'工作状态'" :placeholder="'选择工作状态'"
                  :columns='workStatusList' />
        <MyPicker v-model='filteringDataForms.relayStatus' :label="'继电器状态'" :placeholder="'选择继电器状态'"
                  :columns='relayStatusList' />
        <MyPicker v-model='filteringDataForms.defNo' :label="'设备定义'" :placeholder="'选择设备定义'"
                  :columns='defNoList' />


        <div class='but' style='padding: 5px 16px;'>
          <van-button plain type='primary' block round @click='onReset'>
            重置
          </van-button>
          <van-button type='primary' block round @click='onConfirm'>
            确认
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>

    <div v-show='value===0'>

      <van-pull-refresh v-model='refreshing' @refresh='onRefresh' style='min-height: 100vh;'>

<!--        <van-button size='mini'  color="#fa452f" plain  @click='powerOffWithOneClick'>一键断电</van-button>-->

        <van-list v-model:loading='loading' :finished='finished' finished-text='没有更多了' @load='onLoad'>
          <van-cell center v-for='item in equipmentList' :key='item.value' :title='item.name'  :label="item.equipmentDef.name" >

            <van-button
              v-if="item.defNo === 'AION_FRQJCH' || item.defNo === 'NWD_FRQJCH'"
              :type="item.relayStatus ? 'success' : 'default'"
              :disabled='!item.relayStatus'
              size='mini'
            >
              继电器
            </van-button>

                        <van-button
                          :type="item.workStatus===1 ? 'success':'default'"
                          :disabled='item.workStatus===1 ? false:true'
                          size='mini'
                        >
                          {{ item.workStatus === 1 ? '在线' : '离线' }}
                        </van-button>

            <van-popover :actions='equipmentActions' @select='((val)=>{equipmentOnOffActions(val,item.no)})'
                         :offset='[-6, 0]'>
              <template #reference>
                <van-button type='primary' size='mini'>开关选项</van-button>
              </template>
            </van-popover>
          </van-cell>
        </van-list>
      </van-pull-refresh>
      <van-back-top />
    </div>

    <div v-show='value===1'>
      22
    </div>
  </div>


</template>

<script setup lang='ts'>
  import { onMounted, ref, watch } from 'vue';

  import Title from '@/components/Title.vue';
  import MyPicker from '@/components/CityPicker.vue';
  import { findListByTableParameter } from '@/api/system';
  import { ctrlRelay, powerOffAll, restart } from '@/api/iotEquipment';
  import { closeToast, showLoadingToast, showToast } from 'vant';
  import { showConfirmDialog, showNotify } from 'vant/es';
  // import 'vant/es/notify/style'
  onMounted(() => {
    onLoad();
  });

  const powerOffWithOneClick=()=>{
    showConfirmDialog({
      message:
        '确认要一键断电吗?',

    })
      .then(() => {
        // powerOffAll().then((res) => {
        //     if (res.data.success) {
        // showToast({ message:res.data.msg, position: 'top' });
        //
        //     } else {
        // showToast({ message:res.data.msg, position: 'top' });
        //     }
        // }).catch(() => {
        // showToast({ message:'请求异常', position: 'top' });
        // });
        showToast({ message:'假的，没用哈哈哈', position: 'top' });

      })
      .catch(() => {
        // on cancel
      });
  }

  const menuRef = ref(null);
  const itemRef = ref(null);
  const value = ref(0);//设备页选择

  const options = [//设备页列表
    { text: '设备', value: 0 }
    // { text: '设备固件', value: 1 }
  ];


  //选择器列表数据
  const workStatusList = ref([
    { text: '在线', value: 1 },
    { text: '离线', value: 0 }
  ]);
  const relayStatusList = ref([
    { text: '开', value: 'true' },
    { text: '关', value: 'false' }
  ]);

  const defNoList = ref([
    { text: 'NWD防入侵检测盒', value: 'NWD_FRQJCH' },
    { text: 'AION防入侵检测盒', value: 'AION_FRQJCH' },
    { text: 'AION播放器', value: 'AION_PLAYER' },
    { text: '黄石云摄像头', value: 'EZVIZ_CAMERA' }
  ]);


  //筛选数据表单
  const filteringDataForms = ref({
    no: null,
    name: null,
    workStatus: null,
    relayStatus: null,
    defNo: null,
    createTime: null,
    lastOnLineTime: null
  });


  //筛选
  const onConfirm = () => {
    menuRef.value.close();
    equipmentList.value = []; // 清空设备数据
    onLoad();

  };
  //重置
  const onReset = () => {
    finished.value = false;
    filteringDataForms.value = {
      no: null,
      name: null,
      workStatus: null,
      relayStatus: null,
      defNo: null,
      createTime: null,
      lastOnLineTime: null
    };
    equipmentList.value = [];
    onLoad();
    menuRef.value.close();
  };

  //设备列表刷新
  const onRefresh = () => {
    finished.value = false;

    equipmentList.value = [];
    refreshing.value = true;
    onLoad();
    refreshing.value = false;
  };

  //设备数据
  const equipmentList = ref([]);//设备数据列表
  const loading = ref(false);//设备数据加载状态
  const finished = ref(false);//设备数据是否加载完成
  const refreshing = ref(false);//下拉刷新

  const onLoad = () => {
    if (finished.value) {
      return;
    }
    //设置查询参数
    const parameter = {
      filter: [
        {
          key: 'no',
          expression: 'like',
          value: filteringDataForms.value.no
        }, {
          key: 'name',
          expression: 'like',
          value: filteringDataForms.value.name
        }, {
          key: 'defNo',
          expression: 'in',
          value: filteringDataForms.value.defNo ? [filteringDataForms.value.defNo] : null
        }, {
          key: 'workStatus',
          expression: '=',
          value: filteringDataForms.value.workStatus
        }, {
          key: 'relayStatus',
          expression: '=',
          value: filteringDataForms.value.relayStatus === 'true' ? true : (filteringDataForms.value.relayStatus === 'false' ? false : null)

        }, {
          key: 'createTime',
          type: 'timestamp',
          expression: '[]',
          value: filteringDataForms.value.createTime
        }, {
          key: 'lastOnLineTime',
          type: 'timestamp',
          expression: '[]',
          value: filteringDataForms.value.lastOnLineTime
        }
      ],
      sort: [
        {
          key: 'createTime',
          order: 'desc'
        }
      ]
    };
    loading.value = true;
    const currentPage = Math.ceil(equipmentList.value.length / 15);

    findListByTableParameter('iotEquipment', {
      page: currentPage + 1,  // 加载下一页
      pageSize: 15,
      parameter: JSON.stringify(parameter)
    }).then((res: any) => {
      console.log(res.data.data.total);

      equipmentList.value = equipmentList.value.concat(res.data.data.list);

      loading.value = false;
      if (equipmentList.value.length >= res.data.data.total) {
        finished.value = true;
      }
    });
  };


  //设备开关状态选择相关
  const equipmentActions = [
    { text: '统开' },
    { text: '统关' },
    { text: '重启' }
  ];

  //设备开关选项
  const equipmentOnOffActions = (action, no) => {
    // 处理接口响应
    const handleResponse = (res) => {
      if (res.data.success) {
        showToast({ message: res.data.msg, position: 'top' });
      } else {
        showToast({ message: res.data.msg, position: 'top' });
      }
    };

    switch (action.text) {
      case '统开':
        ctrlRelay(no, 3, true).then(handleResponse);
        break;
      case '统关':
        ctrlRelay(no, 3, false).then(handleResponse);
        break;
      case '重启':
            restart(no).then(handleResponse);
        break;
    }
  };


</script>

<style lang='scss'>
  .equipment {
    width: 100%;

    .van-dropdown-menu {
      margin-top: 46px;
    }

    .van-button.van-button--default.van-button--mini.van-button--plain{
      position: fixed;
      z-index: 10000;
      top: 11px;
      right: 11px;
      //line-height: 46px;
    }

    .van-cell__title {

    }

    .van-cell__value {
      .van-popover__wrapper {
        margin-left: 4px;
      }
    }

    .van-popup.van-popup--top.van-dropdown-item__content {
      .but {
        display: flex;
      }

    }
  }

</style>
`
