<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div style="padding:50px;" id="app">
        <div class="panel panel-primary">
            <div class="panel-heading"><h2>車輛信息</h2></div>
            <div>
            <ul>
              <li> <p align="left">請輸入想搜索的品牌</p> </li>
              <li><input type="search" v-model="btext" name="searchB"></li>
              <li><button class="sebutton" @click='search("brand")'>confirm</button></li>
            </ul> 
             <ul>
              <!--
              利用watch 监控mtext 实现
              <li> <p align="left">請輸入想搜索的型号</p> </li>
              <li><input type="search" v-model="mtext" name="searchM"></li>
              <li><button hidden="true"  @click="search()">confirm</button></li>
              -->
              <li> <p align="left">請輸入想搜索的型号</p> </li>
              <li><input type="search" v-model="mtext" name="searchM"></li>
              <li><button class="sebutton"  @click='search("model")'>confirm</button></li>
            </ul> 
            </div>
            <!-- 暂未实装v-if -->
            <div v-if="flag">
            <table align="center" border="0"  padding-bottom="30px"
            class="table table-bordered table-striped text-center" width="1000px" height="530px">
                <thead>
                    <tr>  
                        <th>實圖</th>
                        <th>品牌</th>
                        <th>型號</th>
                        <th>簡介</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for ="(car,index) in dataShow">
                      <td width="250px" height="200px"><img width="200px" height="180px" :src="car.img"></td>
                      <td width="100px" height="60px">{{car.brand}}</td>
                      <td width="100px" height="60px">{{car.model}}</td>
                      <td width="200px" height="60px"><a :href="car.href"> {{car.lead}} </a> </td>
                  
                    </tr>
                    <tr>
                      <td colspan="1" height="50px"><button  v-on:click="prePage()">上一頁</button></td>
                      <td colspan="2" height="50px"><span>第{{currentPage}}页/共{{pageNum}}页</span></td>
                      <td colspan="1" height="50px"><button @click="nextPage()">下一頁</button></td>
                    </tr>
                </tbody>

            </table>
            </div>
            <div v-else>
                  <p> 暂无对应信息！请重新查询！</p>
              </div>
        </div>
        <!--   <v-table
             :width="1000"
             :columns="columns"
             :table-data="tableData"
             :show-vertical-border="false"
    ></v-table> -->
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      // 所有页面的数据
      totalPage: [],
      // 每页显示数量
      pageSize: 3,
      // 共几页
      pageNum: "",
      // 当前显示的数据
      dataShow: "",
      // 默认当前显示第一页
      currentPage: 1,

      cars:[],

      btext:"",

      mtext:"",

      flag:true,

      carsbackup:[]
    }
  },
  created:function(){

        //獲取數據
        this.getData()

      },

  beforeMount:function(){
        


  },  

  watch:{
    //监控mtext 变化
    /**mtext:function(val){
        let reg = new RegExp(this.mtext);
        let tmp =[];
        for (let i in this.carsbackup) {
            if(reg.test(this.carsbackup[i].model)){
              tmp.push(this.carsbackup[i])
            }
        }
        console.info(tmp)
        this.setPage(tmp);
    }**/
  },  

  computed:{

  },

  methods: {

    getData:function(){
       //獲取數據
        api.get('/stub/car.json',{}).then((response) => {
          console.info("response.data",response.data);
          if(response.data){
            for(var k in response.data){
              this.cars.push(response.data[k]);
            }
            //备份数据 深拷贝
            this.carsbackup = this.cars.slice(0);

          }
          this.setPage(this.cars);
        }).catch((response) =>{ console.info("SOMETHING ERROR",response)});

    },

    search:function(e){
      let tmp =[];
      let reg = "";
      let part;
      if( e === "brand" ){
           reg = new RegExp(this.btext,"i");
      }
      if( e === "model" ){
           reg = new RegExp(this.mtext,"i");
      }
        for (let i in this.carsbackup) {
            if(reg.test(this.carsbackup[i][e])){
              tmp.push(this.carsbackup[i])
            }
        }

        this.setPage(tmp);
    },

    refresh:function(){
      this.getData();
    },

    nextPage() {
      this.currentPage++;
      if (this.currentPage > this.pageNum ) {
        this.currentPage = this.pageNum ;
      }
      this.dataShow = this.totalPage[this.currentPage - 1];
    },
    // 上一页
    prePage() {
      this.currentPage--;
      if (this.currentPage <=0 ) {
        this.currentPage = 1;
      }
      this.dataShow = this.totalPage[this.currentPage - 1];
    },

    jumpPage(index){
      index = index>0 ? index : 1;
      index = index<this.pageSize ? index : this.pageSize;
      this.currentPage = index;
      this.dataShow = this.totalPage[this.currentPage - 1];
    },

    setPage(cars){
        //重新初始化变量
        this.currentPage = 1;
        this.totalPage = [];
        this.dataShow = "";
        this.pageSize = 3;
        console.info(this.pageSize)
        // 根据后台数据的条数和每页显示数量算出一共几页
        this.pageNum = Math.ceil(cars.length / this.pageSize);
        if(!this.pageNum){
          this.currentPage = 0;
          this.dataShow = [];
          return
        }
        console.info("pageNum",this.pageNum)
        // 如果后台数据的条数小于每页显示数量，则只有一页，显示数量就为后台传来的
        if (cars.length < this.pageSize) {
          this.pageSize = cars.length;
        }
        for (let i = 0; i < this.pageNum; i++) {
        // 每一页都是一个数组 形如 [['第一页的数据'],['第二页的数据'],['第三页数据']]
        this.totalPage.push([]);
        // 根据每页显示数量 将后台的数据分割到 每一页， 如第一页是0-5条，第二页是6-10条...
        this.totalPage[i].push(
          // slice操作分割出来的是一个数组
          cars.slice(this.pageSize * i, this.pageSize * (i + 1))

        );    
        // 我们把数组里头的内容作为每一页的内容
        //console.info(this.totalPage[i][0])
        this.totalPage[i] = this.totalPage[i][0];
      }
        this.dataShow = this.totalPage[this.currentPage - 1];

        //console.info(this.dataShow);
    }
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

h2 {

  padding: 60px
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input{
  border: 1px solid #ccc;
  padding: 7px 0px;
  border-radius: 3px;
  padding-left:5px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
}
input:focus{
      border-color: #66afe9;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}

.sebutton { /* 按钮美化 */
  width: 80px; /* 宽度 */
  height: 40px; /* 高度 */
  border-width: 0px; /* 边框宽度 */
  border-radius: 3px; /* 边框半径 */
  background: #1E90FF; /* 背景颜色 */
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  outline: none; /* 不显示轮廓线 */
  font-family: Microsoft YaHei; /* 设置字体 */
  color: white; /* 字体颜色 */
  font-size: 17px; /* 字体大小 */
}
.sebutton:hover { /* 鼠标移入按钮范围时改变颜色 */
  background: #5599FF;
}

</style>

