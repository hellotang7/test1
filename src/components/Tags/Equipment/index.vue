`
<template>
  <div class='equipment'>
    <Title title='设备管理' :Black='true' />


    <van-dropdown-menu ref='menuRef'>
      <van-dropdown-item v-model='value' :options='options' />
      <van-dropdown-item title='筛选'>

        <van-field v-model='filteringDataForms.no' label='设备编号' />
        <van-field v-model='filteringDataForms.name' label='设备名称' />
        <MyPicker v-model='filteringDataForms.workStatus' :label="'工作状态'" :placeholder="'选择城市'" :columns='columns' />
        <MyPicker v-model='filteringDataForms.relayStatus' :label="'继电器状态'" :placeholder="'选择城市'" :columns='columns' />
        <MyPicker v-model='filteringDataForms.defNo' :label="'设备定义'" :placeholder="'选择城市'" :columns='columns' />


        <div style='padding: 5px 16px;'>
          <van-button type='primary' block round @click='onConfirm'>
            确认
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>

    <div v-show='value===0'>
      <van-pull-refresh v-model='refreshing' @refresh='onRefresh'>
        <van-list v-model:loading='loading' :finished='finished' finished-text='没有更多了' @load='onLoad'>
          <van-cell v-for='item in equipmentList' :key='item.value' :title='item.name' is-link>

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
  import { ctrlRelay, restart } from '@/api/iotEquipment';
  import { showToast } from 'vant';


  onMounted(() => {
    onLoad();
  });


  const menuRef = ref(null);
  const itemRef = ref(null);
  const value = ref(0);//设备页选择

  const options = [//设备页列表
    { text: '设备', value: 0 },
    // { text: '设备固件', value: 1 }
  ];

  //选择器选中数据
  const selectedCity = ref('');
  //选择器列表数据
  const columns = ref([
    { text: '杭州', value: 'Hangzhou' },
    { text: '宁波', value: 'Ningbo' },
    { text: '温州', value: 'Wenzhou' },
    { text: '绍兴', value: 'Shaoxing' },
    { text: '湖州', value: 'Huzhou' }
  ]);



  //筛选数据表单
  const filteringDataForms = ref({
    no:null,
    name:null,
    workStatus:null,
    relayStatus:null,
    defNo:null,
    createTime:null,
    lastOnLineTime:null
  })

  const onConfirm = () => {

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
          value: filteringDataForms.value.defNo
        }, {
          key: 'workStatus',
          expression: '=',
          value: filteringDataForms.value.workStatus
        }, {
          key: 'relayStatus',
          expression: '=',
          value: filteringDataForms.value.relayStatus
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
        },
      ],
      sort: [
        {
          key: 'createTime',
          order: 'desc'
        }
      ]
    };

    console.log(parameter.filter);

    findListByTableParameter('iotEquipment', {
      page: 1,
      pageSize: 10 , // 你可以根据需求调整每次加载的数据量
      parameter: JSON.stringify(parameter)

      // 其他参数，如果需要的话
    }).then((res: any) => {
      equipmentList.value = res.data.data.list;
      console.log(res.data.data.total);

      menuRef.value.close();

      // 加载状态结束
      // loading.value = false;
      // // 判断是否已加载所有数据
      // if (equipmentList.value.length >= res.data.data.total) {
      //   finished.value = true;
      // }

    });


  };





  //设备列表刷新
  const onRefresh = () => {
    equipmentList.value = [];
    refreshing.value = true;
    // if (Object.values(filteringDataForms.value).every(value => value === null)) {
    //   console.log(1); // 如果所有值都为 null
    // } else {
    //   console.log(2); // 如果有至少一个值不为 null
    // }
    onLoad();
    refreshing.value = false;
  };

  //设备数据
  const equipmentList = ref([]);//设备数据列表
  const loading = ref(false);//设备数据加载状态
  const finished = ref(false);//设备数据是否加载完成
  const refreshing = ref(false);//下拉刷新

  const onLoad = () => {
    // 如果已经加载完成所有数据，直接返回，不再执行加载操作
    if (finished.value) {
      return;
    }
    // 开始加载
    loading.value = true;
    // 获取当前页数
    const currentPage = Math.ceil(equipmentList.value.length / 15);

    findListByTableParameter('iotEquipment', {
      page: currentPage + 1,  // 加载下一页
      pageSize: 15,
      // 其他参数，如果需要的话
    }).then((res: any) => {
      console.log(res.data.data.total);

      // 将新加载的设备数据添加到列表中
      equipmentList.value = equipmentList.value.concat(res.data.data.list);

      // 加载状态结束
      loading.value = false;

      // 判断是否已加载所有数据
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
  const equipmentOnOffActions = (action, no) => {
    switch (action.text) {
      case '统开':
        ctrlRelay(no, 3, true).then((res) => {
          if (res.data.success) {
            showToast({ message: res.data.msg, position: 'top' });
          } else {
            showToast({ message: res.data.msg, position: 'top' });
          }
        }).catch(() => {
          showToast({ message: '请求异常', position: 'top' });

        }).finally(() => {
        });

        break;
      case '统关':
        ctrlRelay(no, 3, false).then((res) => {
          if (res.data.success) {
            showToast({ message: res.data.msg, position: 'top' });
          } else {
            showToast({ message: res.data.msg, position: 'top' });
          }
        }).catch(() => {
          showToast({ message: '请求异常', position: 'top' });
        }).finally(() => {
        });

        break;
      case '重启':
        restart(no).then((res) => {
          if (res.data.success) {
            showToast({ message: res.data.msg, position: 'top' });
          } else {
            showToast({ message: res.data.msg, position: 'top' });
          }
        }).catch(() => {
          showToast({ message: '请求异常', position: 'top' });
        }).finally(() => {
        });
        break;
    }


  };


</script>

<style lang='scss'>
  .equipment {
    width: 100%;
    //position: relative;
    .van-nav-bar {
      //position: fixed;
    }

    .van-dropdown-menu {
      margin-top: 46px;
      //position: fixed;
    }

    .van-cell.van-cell--clickable {
      //padding: 0 10px;
    }
//
//.van-pull-refresh{
//  border: 1px solid red;
//  min-height: 62vh;
//}

    .van-cell__value {
      .van-popover__wrapper {
        margin-left: 4px;
      }
    }
  }

</style>
`
