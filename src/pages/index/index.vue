<template>
    <view class="content">
        <navbar fresh />
        <mescroll-uni ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :top="`${navbar}px`" :bottom="`${tabbar}px`">
            <view class="main flex flex-wrap justify-content-space-between p-l-20 p-r-20 p-t-10" v-if="list.length">
                <view class="item-block m-t-30" v-for="(item, index) in list" :key="index">
                    <item :time="time" :item="item" />
                </view>
            </view>
        </mescroll-uni>
        <tabbar />
    </view>
</template>
<script>
import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import { mapGetters, mapMutations } from 'vuex'
import { getAllGoods, collects, getIndexList } from '@/utils/api'
export default {
    mixins: [MescrollMixin],
    components: {
        MescrollUni
    },
    data() {
        return {
            lastPage: 0,
            list: [],
            time: '',
        }
    },
    computed: {
        ...mapGetters(['isAll', 'navbar', 'tabbar', 'user', 'collectFlag'])
    },
    watch: {
        isAll() {
            this.freshByManual()
            // this.setCollectFlag()
        },
        collectFlag(n) {
            let { isAll } = this;
            if (!isAll && !!n) {
                this.freshByManual()
                // this.setCollectFlag()
            }
        }
    },
    methods: {
        ...mapMutations(['setCollectFlag']),
        freshByManual() {
            // this.mescroll.resetUpScroll();
            this.upCallback({ num: 1, size: 10 })
            this.setCollectFlag()
        },
        upCallback(page) {
            let { num, size } = page, { isAll } = this, { userNo } = this.user;
            getIndexList({ pageSize: size, pageNo: num, userNo }, isAll).then(res => {
                let { list, lastPage } = res.page || {}, { time } = res;
                if (num == 1) this.list = []
                this.time = time
                this.list = [...this.list, ...(list || [])]
                this.mescroll.endSuccess(list.length, num < lastPage);
            })
            // if (isAll) {
            //     getAllGoods({ pageSize: size, pageNo: num }).then(res => {
            //         let { list, lastPage } = res.page || {}, { time } = res;
            //         if (num == 1) this.list = []
            //         this.time = time
            //         this.list = [...this.list, ...(list || [])]
            //         this.mescroll.endSuccess(list.length, num < lastPage);
            //     })
            // } else {
            //     collects({ pageSize: size, pageNo: num, userNo }).then(res => {
            //         let { list, lastPage } = res.page || {}, { time } = res;
            //         if (num == 1) this.list = []
            //         this.time = time
            //         this.list = [...this.list, ...(list || [])]
            //         this.mescroll.endSuccess(list.length, num < lastPage);
            //     })
            // }

        }
    }
}
</script>
<style lang="scss" scoped>
.item-block {
    width: 345upx;
}
</style>