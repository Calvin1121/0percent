<template>
    <view class="content">
        <navbar />
        <mescroll-uni ref="mescrollRef" @init="mescrollInit" @up="upCallback" :down="downOption" :up="upOption" :top="`${navbar}px`" :bottom="`${tabbar}px`">
            <view class="main flex flex-wrap justify-content-space-between p-l-20 p-r-20 p-t-10" v-if="list.length">
                <view class="item-block m-t-30" v-for="(item, index) in list" :key="index">
                    <item :time="time" :item="item" />
                </view>
            </view>
        </mescroll-uni>
    </view>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { getAllGoods } from '@/utils/api'
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";

export default {
    mixins: [MescrollMixin],
    components: {
        MescrollUni
    },
    data() {
        return {
            lastPage: 0,
            downOption: {use:false},
            list: [],
            op: {},
            time: ''
        }
    },
    computed: {
        ...mapGetters(['keyword', 'navbar', 'tabbar'])
    },
    onLoad(op) {
        this.op = op;
    },
    methods: {
        upCallback(page) {
            let { keyword, op } = this, params = { pageSize: page.size, pageNo: page.num, ...op };
            if (keyword) params.keyWord = keyword
            getAllGoods(params).then(res => {
                let { list, lastPage } = res.page || {}, { time } = res;
                this.time = time
                this.list = [...this.list, ...(list || [])]
                this.mescroll.endSuccess(list.length, page.num < lastPage);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.item-block {
    width: 345upx;
}
</style>