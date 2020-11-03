<template>
    <view class="search flex align-items-center" :style="{background}" @click.stop="tapSearch">
        <view class="icon-block p-l-30 p-r-30 flex align-items-center justify-content-center">
            <image :src="`../static/sousuo${bottom?'@2x':''}.png`" mode="widthFix" class="icon"></image>
        </view>
        <input type="text" class="color-342369 flex-1" :disabled="disabled" v-if="disabled" />
        <input type="text" class="color-342369 flex-1" v-model="value" placeholder-style="color:#342369" @confirm="confirm" :placeholder="placeholder" @focus="setFocus(true)" @blur="setFocus()" :focus="focus" v-else />
        <view class="cancle-block p-l-30 p-r-30 flex align-items-center justify-content-center" v-if="value && !disabled" @tap="cancel">
            <image src="../static/guanbi@2x.png" mode="widthFix" class="icon"></image>
        </view>
    </view>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
var timer;
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
        },
    },
    data() {
        return {
            value: '',
            focus: false,
        }
    },
    watch: {
        keyword: {
            handler(n, o) {
                this.value = n;
            },
            immediate: true
        }
    },
    computed: {
        ...mapGetters(['keyword'])
    },
    created() {
        this.focus = !this.disabled
    },
    methods: {
        ...mapMutations(['setKeyword']),
        ...mapActions(['actHistory']),
        tapSearch() {
            let { disabled } = this;
            if (disabled) uni.navigateTo({ url: '/pages/search/index' })
        },
        confirm() {
            let { value } = this;
            if (!(value || '').trim()) {
                uni.showToast({
                    title: '搜索关键词不能为空~',
                    icon: 'none'
                })
                this.value = ''
                return
            }
            this.setKeyword(value)
            this.actHistory(value)
            uni.navigateTo({ url: '/pages/search/result' })
        },
        setFocus(flag = false) {
            clearTimeout(timer)
            this.$nextTick(() => {
                this.focus = flag
            })
        },
        cancel() {
            this.value = ''
            this.focus = false
            this.setKeyword()
            timer = setTimeout(() => {
                this.focus = true;
            },100)
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
        width: 40upx;
    }
}
</style>