<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import sidebarItems from '@/components/Layout/Full/vertical-sidebar/sidebarItem';
// Icon Imports
import { Menu2Icon, BellRingingIcon } from 'vue-tabler-icons';
import adminSidebarItem from "~/components/Layout/Full/vertical-sidebar/adminSidebarItem";
const sidebarMenu = shallowRef(sidebarItems);
const adminSidebarMenu = shallowRef(adminSidebarItem);
const sDrawer = ref(true);
const {user} = useUserSession();

</script>

<template>
<!--  Sidebar-->
    <v-navigation-drawer left v-model="sDrawer" app class="leftSidebar ml-sm-5 mt-sm-5 bg-containerBg" elevation="10"
        width="270">
        <div class="pa-5 pl-4 ">
            <LayoutFullLogoDark />
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar bg-containerBg overflow-y-hidden">
            <v-list class="py-4 px-4 bg-containerBg">
                <!---Menu Loop -->
              <template  v-if="user.is_admin === 0">
                <template v-for="(item, i) in sidebarMenu">
                  <!---Item Sub Header -->
                  <LayoutFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />
                  <!---Single Item-->
                  <LayoutFullVerticalSidebarNavItem :item="item" v-else class="leftPadding" />
                  <!---End Single Item-->
                </template>
              </template>
                <template v-else>
                  <template v-for="(item, i) in adminSidebarMenu">
                    <!---Item Sub Header -->
                    <LayoutFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---Single Item-->
                    <LayoutFullVerticalSidebarNavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                  </template>
                </template>

                <!-- <Moreoption/> -->
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>
<!--  Header-->
    <div class="container verticalLayout">
        <div class="maxWidth">
            <v-app-bar elevation="0" height="70">
                <div class="d-flex align-center justify-space-between w-100">
                    <div>
                        <v-btn class="hidden-lg-and-up text-muted" @click="sDrawer = !sDrawer" icon
                            variant="flat" size="small">
                            <Menu2Icon size="20" stroke-width="1.5" />
                        </v-btn>
                        <!-- Notification -->
                        <LayoutFullVerticalHeaderNotificationDD />
                    </div>
                    {{user.name}}
                    <div>
                        <!-- User Profile -->
                        <LayoutFullVerticalHeaderProfileDD />
                    </div>
                </div>
            </v-app-bar>
        </div>
    </div>
</template>
