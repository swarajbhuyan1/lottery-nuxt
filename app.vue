<template>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
</template>
<script lang="ts" setup>
const {loggedIn} = useUserSession()
const layout =  (loggedIn.value) ? 'authenticated' : 'default';
</script>