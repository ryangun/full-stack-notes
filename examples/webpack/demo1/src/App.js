import './app.css';
import imgUrl from './star.jpg';

const obj = () => {

}

new Promise((resolve, reject) => {

})

const App = {
    data() {
        return {
            imgUrl: imgUrl
        }
    },
    template: `
        <div id="app">
            我是入口组件<br>
            <img :src="imgUrl" />
        </div>
    `
}

export default App;