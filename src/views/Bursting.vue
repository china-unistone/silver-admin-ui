<template>
    <div class="area">
        <el-tabs v-model="activeName">
            <el-tab-pane label="每日爆款" name="top">
                <SectionTab :section-index="21" :module-index="2"></SectionTab>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script src="http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js"></script>
<script>
    import "../assets/css/area.less"
    import SectionTab from '../components/SectionTab'

    export default {
        name: "Bursting",
        components: {
            SectionTab
        },
        data() {
            return {
                activeName: "top"
            };
        },
        methods: {

        }
    };
</script>