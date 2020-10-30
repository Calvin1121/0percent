<template>
    <view class="content">
        <navbar />
        <view class="main flex flex-wrap justify-content-space-between p-l-20 p-r-20 p-t-40 p-b-40">
            <view class="item-block m-b-30" v-for="(item, index) in list" :key="index">
                <item :time="time" :item="item" />
            </view>
        </view>
        <empty v-if="lastPage && !list.length" />
    </view>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { getAllGoods } from '@/utils/api'
const filter = {
    pageSize: 15,
    pageNo: 1
}
export default {
    data() {
        return {
            lastPage: 0,
            filter: JSON.parse(JSON.stringify(filter)),
            list: [],
            op: {},
            time:''
        }
    },
    computed: {
        ...mapGetters(['keyword'])
    },
    watch: {
        filter: {
            handler(n, o) {
                if (n.pageNo == 1) {
                    this.list = []
                    this.lastPage = 0
                }
                this.getAllGoods()
            },
            deep: true,
        },
    },
    onLoad(op) {
        this.op = op;
        this.getAllGoods()
    },
    onReachBottom() {
        let { filter, lastPage } = this;
        if (filter.pageNo < lastPage) filter.pageNo += 1
    },
    methods: {
        getAllGoods() {
            let { filter, op } = this, { keyword } = this, params = { ...filter, ...op };
            if (keyword) params.keyWord = keyword
            getAllGoods(params).then(res => {
                let { list, lastPage } = res.page||{},{time} = res;
                this.time = time
                this.list = [...this.list, ...(list || [])]
                this.lastPage = lastPage || 1
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