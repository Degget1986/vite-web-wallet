<template>
    <div class="filter-root">
        <div class="filter">
            <div class="filter_label"> {{ $t("tradeOrderHistory.filter.start") }} </div>
            <FlatPickr
                v-model="fromDate"
                class="filter_content"
                :config="{dateFormat:'Y/m/d H:i',enableTime:true,time_24hr:true}"
            ></FlatPickr>
        </div>
        <div class="separator">-</div>
        <div class="filter end">
            <div class="filter_label">{{ $t("tradeOrderHistory.filter.end") }}</div>
            <FlatPickr
                v-model="toDate"
                class="filter_content"
                :config="{dateFormat:'Y/m/d H:i',enableTime:true,time_24hr:true}"
            ></FlatPickr>
        </div>
        <div class="filter">
            <div class="filter_label">{{ $t("tradeOrderHistory.filter.type") }}</div>
            <select class="filter_content" v-model="ftoken">
                <option :value="token.symbol" v-for="token in ftokenMap" :key="token.symbol">{{ token.symbol }}</option>
            </select>
        </div>
        <div class="separator">-</div>
        <div class="filter end">
            <select class="filter_content" v-model="ttoken">
                <option v-for="t in marketMap" :value="t.symbol" :key="t.symbol">{{ t.symbol }}</option>
            </select>
        </div>

        <div class="filter end">
            <div class="filter_label">{{ $t("tradeOrderHistory.filter.side") }}</div>
            <select v-model="tradeType" class="filter_content">
                <option value="0">{{ $t("tradeOrderHistory.filter.buy") }}</option>
                <option value="1">{{ $t("tradeOrderHistory.filter.sell") }}</option>
            </select>
        </div>

        <div v-show="isShowStatus" class="filter end">
            <div class="filter_label">{{ $t("tradeOrderHistory.filter.status") }}</div>
            <select v-model="status" class="filter_content">
                <option value="1">{{ $t("tradeOrderHistory.status.1") }}</option>
                <option value="2">{{ $t("tradeOrderHistory.status.2") }}</option>
                <option value="3">{{ $t("tradeOrderHistory.status.3") }}</option>
                <option value="4">{{ $t("tradeOrderHistory.status.4") }}</option>
            </select>
        </div>

        <div @click="submit" class="search active">
            {{ $t("tradeOrderHistory.filter.search") }}
        </div>
        <div @click="reset" class="search">
            {{ $t("tradeOrderHistory.filter.reset") }}
        </div>
    </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import { tokenMap } from 'services/trade';
import 'flatpickr/dist/flatpickr.css';
import statistics from 'utils/statistics';
import { VITE_TOKENID } from 'utils/constant';

export default {
    components: { FlatPickr },
    props: {
        isShowStatus: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isInitFtoken: false,
            fromDate: '',
            toDate: '',
            tradeType: '',
            ftoken: '',
            ttoken: '',
            status: '',
            ftokenMap: []
        };
    },
    beforeMount() {
        this.ttoken = this.marketMap[0].symbol;
    },
    computed: {
        marketMap() {
            return this.$store.state.exchangeMarket.marketMap;
        },
        activeAddr() {
            return this.$store.getters.activeAddr;
        }
    },
    watch: {
        ttoken() {
            this.getFtoken();
        },
        ftokenMap() {
            if (this.isInitFtoken || this.ftoken || !this.ftokenMap || !this.ftokenMap.length) {
                return;
            }

            const filterToken = this.ftokenMap.filter(t => t.tokenId === VITE_TOKENID);
            this.ftoken = filterToken.length > 0 ? 'VITE' : this.ftokenMap[0].symbol;
            this.isInitFtoken = true;
        },
        isInitFtoken() {
            this.submit();
        }
    },
    methods: {
        reset() {
            statistics.event(this.$route.name, 'reset', this.activeAddr || '');

            this.fromDate = '';
            this.toDate = '';
            this.tradeType = '';
            this.ftoken = '';
            this.ttoken = '';
            this.status = '';
            this.$emit('submit', {});
        },
        submit() {
            statistics.event(this.$route.name, 'search', this.activeAddr || '');

            const fdate = this.fromDate ? new Date(this.fromDate).getTime() / 1000 : '';
            const tdate = this.toDate ? new Date(this.toDate).getTime() / 1000 : '';

            if (fdate && tdate && fdate >= tdate) {
                this.$toast(this.$t('tradeOrderHistory.hint.dateErr'));
                return;
            }

            this.$emit('submit', {
                startTime: fdate,
                endTime: tdate,
                side: this.tradeType,
                tradeTokenSymbol: this.ftoken,
                quoteTokenSymbol: this.ttoken,
                status: this.status
            });
        },
        getFtoken() {
            if (!this.ttoken) {
                return;
            }

            const symbol = this.ttoken;
            this.ftokenMap = [];

            tokenMap({ symbol }).then(data => {
                if (this.ttoken !== symbol) {
                    return;
                }
                this.ftokenMap = data;
            }).catch(err => {
                console.warn(err);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.filter-root {
    display: flex;
    align-items: flex-end;
    margin-bottom: 20px;
    font-size: 12px;

    .filter {
        @include font_color_2();
        @include font-family-normal();
        width: 132px;
        > * {
            width: 100%;
        }

        input,
        select {
            padding-left: 10px;
        }

        &.end {
            margin-right: 18px;
        }
    }

    .separator {
        height: 28px;
        margin: 0 8px;
        display: flex;
        [data-theme="0"] & {
            color: #d4dee7;
        }
        [data-theme="1"] & {
            color: $black-color-2;
        }
    }

    .filter_content {
        margin-top: 6px;
        height: 28px;
        border-radius: 2px;
        box-sizing: border-box;
        @include default_font_color();
        @include bg_color_3();
        @include common_border();
    }

    .search {
        width: 60px;
        height: 28px;
        color: #007aff;
        border-radius: 2px;
        border: 1px solid #007aff;
        font-family: $font-normal-b;
        font-weight: normal;
        text-align: center;
        line-height: 28px;
        margin-right: 8px;
        cursor: pointer;

        &:active,
        &.active {
            background: rgba(0, 122, 255, 1);
            color: #fff;
        }
    }
}
</style>
