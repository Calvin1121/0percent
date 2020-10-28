<script>
import { mapMutations } from 'vuex';
export default {
    onLaunch: function(o) {
        this.init()
        const query = decodeURIComponent(o.query)
        let { scene } = query || {};
        this.setQuery(scene)

    },
    methods: {
        init() {
            let ipx = !!((uni.getSystemInfoSync().model || '').match(/iphone x|iphone 11|iphon 12/gi))
            this.setIsIPX(ipx)
            this.setIsAll()
            this.setToken()
            this.setCollectFlag()
            this.setQuery()
        },
        ...mapMutations(['setIsIPX', 'setIsAll', 'setToken', 'setCollectFlag', 'setQuery'])
    }
}
</script>
<style>
/*每个页面公共css */
</style>