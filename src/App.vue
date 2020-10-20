<script>
import { mapMutations } from 'vuex';
export default {
    onLaunch: function() {
        console.log('App Launch')
        this.init()
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    },
    methods: {
        init() {
            let ipx = !!((uni.getSystemInfoSync().model || '').match(/iphone x|iphone 11|iphon 12/gi))
            console.log(uni.getSystemInfoSync().model)
            this.setIsIPX(ipx)
        },
        ...mapMutations(['setIsIPX'])
    }
}
</script>
<style>
/*每个页面公共css */
</style>