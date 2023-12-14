<template>
  <div class='nav-list'>
    <RouterLink to="/items" class={s.action} activeClass={s.activeClass}>
      <Icon name="home" class={s.icon}/>
    </RouterLink>
    <RouterLink to="/statistics" class={s.action} activeClass={s.activeClass}>
      <Icon name="statistics" class={s.icon} />
    </RouterLink>
    <RouterLink to={'/items/create'} class={s.action} activeClass={s.activeClass}>
      <Icon name="add" class={s.icon}/>
    </RouterLink>
    <RouterLink to="/export" class={s.action} activeClass={s.activeClass}>
      <Icon name="export" class={s.icon}></Icon>
    </RouterLink>
    <RouterLink to="/user" class={s.action} activeClass={s.activeClass}>
      <Icon name="user" class={s.icon}></Icon>
    </RouterLink>
  </div>

</template>

<script setup lang="ts">

</script>

<style lang='scss' scoped>

</style>
