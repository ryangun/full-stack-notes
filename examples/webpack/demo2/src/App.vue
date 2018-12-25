<template>
    <div id="app">
        {{msg}}
        <br>
        <img :src="imgUrl" />
    </div>
</template>

<script>
    import imgUrl from './star.jpg';
    export default {
        data() {
            return {
                msg: 'hello app.vue',
                imgUrl: imgUrl
            }
        }
    }
</script>