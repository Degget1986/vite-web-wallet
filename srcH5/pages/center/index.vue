<template>
    <div class="trade-center-wrapper __wrapper">
        <loading v-show="isLoading" loadingType="dot" class="ex-center-loading"></loading>
        <div v-show="!isLoading">
            <center-head></center-head>
            <div class="white-wrapper">
                <limit-price></limit-price>
                <depth></depth>
            </div>
            <div class="order-white-wrapper">
                <div class="order-tab">{{ $t('tradeOpenOrders.title') }}</div>
                <openOrder></openOrder>
            </div>
        </div>
    </div>
</template>

<script>
import loading from 'components/loading';
import openOrder from 'h5Components/orderOpen.vue';
import { bridge } from 'h5Utils/bridge';
import depth from './depth/depth.vue';
import limitPrice from './limitPrice/limitPrice.vue';
import centerHead from './head/head.vue';

export default {
    components: { depth, limitPrice, centerHead, openOrder, loading },
    mounted() {
        this.$store.dispatch('dexFetchActiveTxPair');
        this.$store.dispatch('exFetchVip');
        this.$store.dispatch('exFetchSVip');
        this.$store.dispatch('getMarketsClosed');
        this.$store.dispatch('exFetchLimitAmounts');
        this.$store.dispatch('startLoopDexFundeUnreceived');
        this.$store.dispatch('initFavorite');

        bridge.subscribe('page.onShow', () => {
            this.$store.dispatch('initFavorite');
        });
    },
    destroyed() {
        this.$store.dispatch('stopLoopDexFundUnreceived');
    },
    computed: {
        isLoading() {
            return this.$store.state.exchangeActiveTxPair.isLoading;
        },
        address() {
            return this.$store.getters.activeAddr;
        }
    },
    watch: {
        address() {
            this.$store.dispatch('exFetchVip');
            this.$store.dispatch('exFetchSVip');
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~h5Assets/scss/vars.scss";

.trade-center-wrapper {
    font-size: 12px;
    background: rgba(243,245,249,1);
}
.white-wrapper {
    padding: 16px 24px;
    background: #fff;
    margin-bottom: 16px;
}
.order-white-wrapper {
    padding-top: 16px;
    background: #fff;
}
.order-tab {
    margin-bottom: 10px;
    padding: 0 24px;
    line-height: 20px;
    font-size: 14px;
    @include font-bold();
    color: rgba(62,74,89,1);
}
</style>
