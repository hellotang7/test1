<template>
  <div class='equipment'>
    <Title title='设备管理' :Black='true' />


    <van-tabs v-model:active='active' sticky>
      <div class='filter-button' @click.stop='show = true'>
        <p> 筛选
          <van-icon name='filter-o' />
        </p>
      </div>

      <van-tab title='设备'>
        <van-pull-refresh v-model='refreshing' @refresh='onRefresh'>
          <van-list v-model:loading='loading' :finished='finished' finished-text='没有更多了' @load='onLoad'>

            <van-cell v-for='item in list' :key='item.value' :title='item.name' is-link
                      to='/1'>
              <van-button :type="item.workStatus===1 ? 'success':'default'" :disabled='item.workStatus===1 ? false:true' size="mini">设备</van-button>
              <van-button :type="item.relayStatus === true ? 'success':'default'" :disabled='item.relayStatus === true ? false:true' size="mini">继电器</van-button>

            </van-cell>

          </van-list>
        </van-pull-refresh>
      </van-tab>

      <van-tab title='设备固件'>
        222
      </van-tab>


      <!--      筛选弹出层-->
      <van-action-sheet v-model:show='show' title='全部筛选'>
        <div class='content'>
          <!--          <van-cell-group inset>-->
          <van-field v-model='text' label='设备编号' />
          <van-field v-model='text' label='设备名称' />
          <MyPicker v-model='selectedCity' :label="'工作状态'" :placeholder="'选择城市'" :columns='columns' />
          <MyPicker v-model='selectedCity' :label="'继电器状态'" :placeholder="'选择城市'" :columns='columns' />
          <MyPicker v-model='selectedCity' :label="'设备定义'" :placeholder="'选择城市'" :columns='columns' />


          <!--          </van-cell-group>-->
          <div class='buts'>
            <van-button round type='success'>重置</van-button>
            <van-button round type='success'>筛选</van-button>
          </div>

        </div>
      </van-action-sheet>


    </van-tabs>

  </div>
</template>

<script lang='ts' setup>
  import { onMounted, ref } from 'vue';

  import Title from '@/components/Title.vue';
  import { showToast } from 'vant';
  import MyPicker from '@/components/CityPicker.vue';
  import { findListByTableParameter } from '@/api/system';


  //tab页选中页
  const active = ref(0);

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


  //设备数据
  const list = ref([

  ]);



  const loading = ref(false);
  const finished = ref(false);
  const refreshing = ref(false);


  const onLoad = () => {
    // 开始加载
    loading.value = true;

    // 调用真实接口
    findListByTableParameter('iotEquipment', {
      page: 1,
      pageSize: 10  // 你可以根据需求调整每次加载的数据量
      // 其他参数，如果需要的话
    }).then((res: any) => {
      // 异步更新数据
      // const columns = res.data.data.list.map(item => {
      //   return { name: item.name, value: item.no };
      // });
      // console.log(columns);

      list.value = list.value.concat(res.data.data.list);

      // console.log(list.value.map(i=>i.relayStatus));
      console.log(res.data.data.total);
      // 加载状态结束
      loading.value = false;

      // 判断是否已加载所有数据
      if (list.value.length >= res.data.data.total) {
        finished.value = true;
      }
    });


  };

  const onRefresh = () => {
    // 清空列表数据
    list.value = []
    refreshing.value = true;
    onLoad();
    refreshing.value = false;
  };


  const show = ref(false);


</script>

<style lang='scss'>
  .van-sticky {
    width: 86%;
  }

  .filter-button {
    background: #ffffff;
    width: calc(100% - 86%);
    height: 44px;
    position: fixed;
    top: 46px;
    right: 0px;
    z-index: 1; /* 确保按钮在标签栏上方 */
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;


    color: #646566;

    .van-icon-filter-o {
      color: #646566;
    }

  }

  .van-tabs {
    margin-top: 46px;

    .van-tabs__wrap {

      z-index: 1;
      position: fixed;
      width: 100%;
    }

    .van-list {
      margin-top: 45px;

    }
  }

  .content {
    padding: 16px 16px 60px;

    .buts {
      text-align: center;
    }
  }

</style>
