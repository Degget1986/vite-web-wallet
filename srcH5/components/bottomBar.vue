<template>
    <div class="bottom-bar-wrapper">
        <div class="bar-item" v-for="(item, i) in barList" :key="i" @click="go(item)">
            <img v-show="$route.name === item" :src="icon[`${item}ActiveIcon`]"/>
            <img v-show="$route.name !== item" :src="icon[`${item}Icon`]"/>
            <div :class="{'active': $route.name === item}">{{ $t(`mobileBottomBar.${item}`) }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import centerIcon from 'h5Assets/imgs/center_bar.png';
import centerActiveIcon from 'h5Assets/imgs/center_bar_active.png';
import orderIcon from 'h5Assets/imgs/order_bar.png';
import orderActiveIcon from 'h5Assets/imgs/order_bar_active.png';
import assetsIcon from 'h5Assets/imgs/assets_bar.png';
import assetsActiveIcon from 'h5Assets/imgs/assets_bar_active.png';
import miningIcon from 'h5Assets/imgs/mining_bar.png';
import miningActiveIcon from 'h5Assets/imgs/mining_bar_active.png';

export default {
    data() {
        return {
            icon: {
                centerIcon,
                centerActiveIcon,
                orderIcon,
                orderActiveIcon,
                assetsIcon,
                assetsActiveIcon,
                miningIcon,
                miningActiveIcon
            },
            barList: [ 'assets', 'center', 'order', 'mining' ]
        };
    },
    methods: {
        go(name) {
            this.$router.push({ name });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~h5Assets/scss/vars.scss";

.bottom-bar {
    display: flex;
    flex-direction: right;
    font-size: 11px;
    @include font-normal();
    color: rgba(183,201,223,1);
    line-height: 14px;
    .bar-item {
        text-align: center;
        flex: 1;
        .active {
            color: $blue;
        }
        img {
            width: 28px;
            height: 28px;
        }
    }
}
</style>
