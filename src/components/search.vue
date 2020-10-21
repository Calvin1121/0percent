<template>
    <view class="search flex align-items-center" :style="{background}" @click.stop="tapSearch">
        <view class="icon-block p-l-30 p-r-30 flex align-items-center justify-content-center">
            <image :src="`../static/sousuo${bottom?'@2x':''}.png`" mode="widthFix" class="icon"></image>
        </view>
        <input type="text" class="color-342369 flex-1" v-model="search.keywords" placeholder-style="color:#342369" @confirm="confirm" :placeholder="placeholder" :focus="!disabled" :disabled="disabled"  @focus="this.search.type=''" />
        <view class="cancle-block p-l-30 p-r-30 flex align-items-center justify-content-center" v-if="search.keywords && !disabled" @tap="cancel">
            <image src="../static/guanbi@2x.png" mode="widthFix" class="icon"></image>
        </view>
    </view>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'search',
    props: {
        background: {
            type: String,
            default: '#342369'
        },
        placeholder: {
            type: String,
            default: ''
        },
        holderClass: {
            type: String,
            default: ''
        },
        bottom: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            focus: false
        }
    },
    computed: {
        ...mapGetters(['search'])
    },
    watch: {
        search: {
            handler(n, o) {
                if (n && n.type == 'confirm'){
                    uni.navigateTo({ url: './result' })
                }
            },
            deep: true
        },
    },
    methods: {
        ...mapMutations(['setSearch']),
        tapSearch() {
            let { disabled } = this;
            if (disabled) uni.navigateTo({ url: '/pages/search/index' })
        },
        confirm() {
            let { keywords } = this.search, search = {};
            if (!((keywords || '').trim())) {
                uni.showToast({
                    title: '搜索关键词不能为空~',
                    icon: 'none'
                })
                this.search.keywords = ''
                return
            }
            search = { ...search, keywords, type: 'confirm' };
            this.setSearch(search)
        },
        cancel() {
            this.search.keywords = ''
            let { keywords } = this.search, search = {};
            search = { ...search, keywords, type: '' };
            this.setSearch(search)
        }
    }
}
</script>
<style lang="scss" scoped>
.search {
    width: inherit;
    border-radius: 50upx;
    height: 60upx;

    .icon {
        width: 30upx;
    }
}
</style>