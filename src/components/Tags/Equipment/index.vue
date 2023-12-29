<template>
  <div class='equipment'>
    <Title :dynamicTitle="'设备管理'" :showLeftButton='true' :showRightButton='true' RightButtonText='一键断电'
           @click-right='powerOffWithOneClick' />

    <van-dropdown-menu ref='menuRef'>
      <van-dropdown-item v-model='equipmentPageSelect' :options='options' />
      <van-dropdown-item title='筛选'>
        <van-field v-model='filteringDataForms.no' label='设备编号' placeholder='输入编号' />
        <van-field v-model='filteringDataForms.name' label='设备名称' placeholder='输入名称' />

        <PopUpPicker v-model='filteringDataForms.workStatus'
                     :label="'工作状态'"
                     :placeholder="'选择工作状态'"
                     :columns='workStatusList'
                     :showRules='false' />
        <PopUpPicker v-model='filteringDataForms.relayStatus'
                     :label="'继电器状态'"
                     :placeholder="'选择继电器状态'"
                     :columns='relayStatusList'
                     :showRules='false' />
        <PopUpPicker v-show='equipmentPageSelect===0'
                     v-model='filteringDataForms.defNo'
                     :label="'设备定义'"
                     :placeholder="'选择设备定义'"
                     :columns='defNoList'
                     :showRules='false' />
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

    <div>

      <van-pull-refresh v-model='refreshing' @refresh='onRefresh' style='min-height: 100vh;'>

        <van-list v-model:loading='inLoading' :finished='finished' finished-text='没有更多了' @load='onLoad'>
          <van-button icon='plus' type='primary' block plain @click='EquipmentAddEdit()'>新增设备</van-button>
          <van-cell center v-for='item in equipmentList' :key='item.value' :title='item.name'
                    :label='item.equipmentDef.name'>
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
            <van-popover
              v-if="item.defNo === 'AION_FRQJCH' || item.defNo === 'NWD_FRQJCH'"
                         :actions='equipmentActions1'
                         @select='((val)=>{equipmentOnOffActions(val,item.no)})'
                         placement='left-start'>
              <template #reference>
                <van-button type='primary' size='mini'>按钮选项</van-button>
              </template>
            </van-popover>

            <van-popover
              v-if="item.defNo === 'AION_PLAYER'"
                         :actions='equipmentActions2'
                         @select='((val)=>{equipmentOnOffActions(val,item.no)})'
                         placement='left-start'>
              <template #reference>
                <van-button type='primary' size='mini'>按钮选项</van-button>
              </template>
            </van-popover>

            <van-popover
              v-if="item.defNo === 'EZVIZ_CAMERA'"
                         :actions='equipmentActions3'
                         @select='((val)=>{equipmentOnOffActions(val,item.no)})'
                         placement='left-start'>
              <template #reference>
                <van-button type='primary' size='mini'>按钮选项</van-button>
              </template>
            </van-popover>

            <van-icon size='24' name='edit' @click='EquipmentAddEdit(item.id)' />
          </van-cell>
        </van-list>
      </van-pull-refresh>
      <van-back-top />
    </div>

  </div>


</template>

<script setup lang='ts'>
  import { onMounted, ref, watch } from 'vue';

  import Title from '@/components/Title.vue';
  import PopUpPicker from '@/components/PopUpPicker.vue';
  import { findListByTableParameter } from '@/api/system';
  import { ctrlRelay, powerOffAll, restart } from '@/api/iotEquipment';
  import { closeToast, showLoadingToast, showToast } from 'vant';
  import { showConfirmDialog, showNotify } from 'vant/es';
  import { useRouter } from 'vue-router';
  import { loading } from '@/components/isLoading';

  // import 'vant/es/notify/style'
  const router = useRouter();
  onMounted(() => {
    onLoad();
  });

  const EquipmentAddEdit = (id?: number) => {
    //编辑
    if (id) {
      console.log(id);
      router.push({
        path: '/addEdit',
        query: { id }
      });
    } else {
      //新增
      router.push({
        path: '/addEdit'
      });
    }


  };

  const powerOffWithOneClick = () => {
    showConfirmDialog({
      message:
        '确认要一键断电吗?'

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
        showToast({ message: '假的，没用哈哈哈', position: 'top' });

      })
      .catch(() => {
        // on cancel
      });
  };

  const menuRef = ref(null);
  const itemRef = ref(null);
  const equipmentPageSelect = ref(0);//设备页选择

  const options = [//设备页列表
    { text: '总设备', value: 0 },
    { text: 'NWD防入侵检测盒', value: 1 },
    { text: 'AION防入侵检测盒', value: 2 },
    { text: 'AION播放器', value: 3 },
    { text: '黄石云摄像头', value: 4 }
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
  const inLoading = ref(false);//设备数据加载状态
  const finished = ref(false);//设备数据是否加载完成
  const refreshing = ref(false);//下拉刷新

  watch(equipmentPageSelect, (newValue) => {
    equipmentList.value = []; // 清空设备数据
    finished.value = false;
    onLoad();

  });

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
    switch (equipmentPageSelect.value) {
      case 1:
        parameter.filter.forEach(item => {
          if (item.key === 'defNo') {
            item.value = ['NWD_FRQJCH'] as any;
          }
        });
        break;
      case 2:
        parameter.filter.forEach(item => {
          if (item.key === 'defNo') {
            item.value = ['AION_FRQJCH'] as any;
          }
        });
        break;
      case 3:
        parameter.filter.forEach(item => {
          if (item.key === 'defNo') {
            item.value = ['AION_PLAYER'] as any;
          }
        });
        break;
      case 4:
        parameter.filter.forEach(item => {
          if (item.key === 'defNo') {
            item.value = ['EZVIZ_CAMERA'] as any;
          }
        });
        break;
    }

    inLoading.value = true;
    const currentPage = Math.ceil(equipmentList.value.length / 15);

    findListByTableParameter('iotEquipment', {
      page: currentPage + 1,  // 加载下一页
      pageSize: 15,
      parameter: JSON.stringify(parameter)
    }).then((res: any) => {
      console.log(res.data.data.total);

      equipmentList.value = equipmentList.value.concat(res.data.data.list);

      inLoading.value = false;
      if (equipmentList.value.length >= res.data.data.total) {
        finished.value = true;
      }
    });
  };


  //设备开关状态选择相关
  const equipmentActions1 = [
    { text: '统开' },
    { text: '统关' },
    { text: '重启' }
  ];
  const equipmentActions2 = [

    { text: '重启' }
  ];
  const equipmentActions3 = [

    { text: '直播' }
  ];

  //设备开关选项
  const equipmentOnOffActions = async (action, no) => {
    loading(true);
    const showToastMessage = (res) => {
      if (res.data.success) {
        showToast({ message: res.data.msg });
      } else {
        showToast({ message: res.data.msg });
      }
    };
    try {
      switch (action.text) {
        case '统开':
          await ctrlRelay(no, 3, true).then(showToastMessage);
          break;
        case '统关':
          await ctrlRelay(no, 3, false).then(showToastMessage);
          break;
        case '重启':
          await restart(no).then(showToastMessage);
          break;
          case '直播':
            router.push({
              path: '/live',
              query: { no }
            });
          // await openEzvizLiveWindow(no).then(showToastMessage);
          break;
        default:
          showToast({ message: '未知操作', position: 'top' });
      }
    } catch (error) {
      showToast({ message: '请求异常', position: 'top' });
    } finally {
      loading(false);
    }
  };


</script>

<style lang='scss' scoped>
  .equipment {
    //width: 100%;

    .van-dropdown-menu {
      position: fixed;
      z-index: 1;
      width: 100%;
      top: 46px;
    }

    .van-list {
      margin-top: 96px;
    }

    :deep(.van-popover__wrapper) {
      margin: 0 10px 6px 4px;

    }

    :deep(.van-cell__value) {
      display: flex;
      flex-direction: row;
      justify-content: end;
      align-items: center;
    }

    .van-popup.van-popup--top.van-dropdown-item__content {
      .but {
        display: flex;
      }
    }
  }

</style>
`
