<template>
    <template v-for="item in HeaderData" :key="item.tittle">
        <li v-if="item.separateRoute" :class="{ active: route_array[1] === item.active_link }">
            <router-link :to="{ 'path': item.route }">{{ item.tittle }}</router-link>
        </li>
        <li v-else class="has-submenu"
            :class="{ active: route_array[1] === (item.active_link ? item.active_link : '') }">
            <a href="javascript:void(0);" @click="toggleTab(item)">
                {{ item.tittle }} <i class="fas fa-chevron-down"></i>
            </a>
            <ul class="submenu" :class="{ 'd-block': item.showAsTab }">
                <template v-for="menuItem in item.menu" :key="menuItem.menuValue">
                    <li v-if="!menuItem.hasSubRoute"
                        :class="{ active: currentPath === (menuItem.active_link ? menuItem.active_link : '') }">
                        <router-link :to="{ 'path': menuItem.route }">{{ menuItem.menuValue }}</router-link>
                    </li>
                    <li v-else class="has-submenu"
                        :class="{ active: route_array[2] === (menuItem.active_link ? menuItem.active_link : '') }">
                        <a href="javascript:void(0);">{{ menuItem.menuValue }}</a>
                        <ul class="submenu" :class="{ 'd-block': menuItem.showSubRoute }">
                            <template v-for="subMenu in menuItem.subMenus" :key="subMenu.menuValue">
                                <li
                                    :class="{ 'active': currentPath === (subMenu.active_link ? subMenu.active_link : '') }">
                                    <router-link :to="{ 'path': subMenu.route }">{{ subMenu.menuValue }}</router-link>
                                </li>
                            </template>
                        </ul>
                    </li>
                </template>
            </ul>
        </li>
    </template>
</template>

<script>
import HeaderData from '@/assets/json/header.json'
export default {
    data() {
        return {
            HeaderData: HeaderData,
            route_array: [],
        }
    },
    methods: {
        toggleTab(item) {
            item.showAsTab = !item.showAsTab;
        }
    },
    computed: {
        currentPath() {
            this.route_array = this.$route.path.split("/");
            return this.$route.path;
        },
    },
}
</script>