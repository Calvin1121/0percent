<template>
    <view class="content">
        <navbar fresh />
        <view class="main flex flex-wrap justify-content-space-between p-l-20 p-r-20 p-t-40 p-b-40" v-if="list.length">
            <view class="item-block m-b-30" v-for="(item, index) in list" :key="index">
                <item :time="time" :item="item" />
            </view>
        </view>
        <block v-if="lastPage && !list.length">
            <empty />
        </block>
        <tabbar />
    </view>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import { getAllGoods, collects } from '@/utils/api'
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
            time:'',
            isRefresh:false
        }
    },
    computed: {
        ...mapGetters(['isAll', 'navbar', 'tabbar', 'user', 'collectFlag'])
    },
    watch: {
        isAll() {
            this.isRefresh = true
            this.filter = JSON.parse(JSON.stringify(filter))
            this.setCollectFlag()
        },
        filter: {
            handler(n, o) {
                let { isAll } = this;
                isAll ? this.getAllGoods() : this.collects()
            },
            deep: true,
            immediate: true
        },
        collectFlag(n) {
            let { isAll } = this;
            if (!isAll && !!n) {
                this.isRefresh = true
                this.filter = JSON.parse(JSON.stringify(filter))
                this.setCollectFlag()
            }
        }
    },
    onPullDownRefresh() {
        this.isRefresh = true
        this.filter = JSON.parse(JSON.stringify(filter))
    },
    onReachBottom() {
        let { filter, lastPage } = this;
        if (filter.pageNo < lastPage) {
            filter.pageNo += 1
        }
    },
    methods: {
        ...mapMutations(['setCollectFlag']),
        getAllGoods() {
            let { filter } = this;
            getAllGoods(filter).then(res => {
                let { list, lastPage } = res.page||{}, {time} = res;
                if(this.isRefresh){
                    this.list = []
                    this.lastPage = 0
                }
                this.isRefresh = false
                this.time = time
                this.list = [...this.list, ...(list || [])]
                this.lastPage = lastPage || 1
                // uni.stopPullDownRefresh()
            })
        },
        collects() {
            let { filter } = this, { userNo } = this.user;
            collects({ ...filter, userNo }).then(res => {
                let { list, lastPage } = res.page||{}, {time} = res;
                if(this.isRefresh){
                    this.list = []
                    this.lastPage = 0
                }
                this.isRefresh = false
                this.time = time
                this.list = [...this.list, ...(list || [])]
                this.lastPage = lastPage || 1
                // uni.stopPullDownRefresh()
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