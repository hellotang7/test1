<template>
  <div class='nav'>
    <RouterLink to='/home' >
      <Icon   iconSrc='icon-shouye' />

    </RouterLink>
    <RouterLink to='/user' >
      <Icon   iconSrc='icon-gerenzhongxin' />
    </RouterLink>

  </div>

</template>

<script setup lang='ts'>

</script>

<style lang='scss' scoped>
.nav{
  margin: 0 4%;
  width: 92%;
  background-color: transparent;
  z-index: 10;
  position: fixed;
  bottom: 1.52vh;
  height: 10.38vh;
  border-radius: 3rem;
  box-shadow:  0px 0px 2.2px rgba(0, 0, 0, .02), 0px 0px 5.4px rgba(0, 0, 0, .028), 0px 0px 10.1px rgba(0, 0, 0, .035), 0px 0px 18.1px rgba(0, 0, 0, .042), 0px 0px 33.8px rgba(0, 0, 0, .05), 0px 0px 81px rgba(0, 0, 0, .07);
  --bigger-font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .router-link-exact-active{
    fill: rgba(254, 166, 65, 1);
  }
}
</style>
