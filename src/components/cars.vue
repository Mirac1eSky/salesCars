<template src='./cars.html'></template>
  

<script>
import api from '@/api'
export default {
  name: 'cars',
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

      carsbackup:[],

      psize:1
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
            this.cars = this.sortByPrice(this.cars);
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
        for (let i in this.cars) {
            if(reg.test(this.cars[i][e])){
              tmp.push(this.cars[i])
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

    jumpPage(){
      this.psize = this.psize>0 ? this.psize : 1;
      this.psize = this.psize<this.pageNum ? this.psize : this.pageNum;
      this.currentPage = this.psize;
      this.dataShow = this.totalPage[this.currentPage - 1];
    },

    setPage(cars){
        this.currentPage = 1;
        this.totalPage = [];
        this.dataShow = "";
        this.pageSize = 3;
        console.info(this.pageSize)
        // 根据后台数据的条数和每页显示数量算出一共几页
        this.pageNum = Math.ceil(cars.length / this.pageSize);
        if(!this.pageNum){
          this.currentPage = 0;
          this.dataShow = "";
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
    },

    sortByPrice:function(arr){
      if(typeof arr == 'undefined'|| arr == null|| arr.length == 0){
        return arr;
      }
      let len = arr.length;
      let preIndex, current;
      for (let i = 1; i < len; i++) {
          preIndex = i - 1;
          current = arr[i];
          while (preIndex >= 0 && arr[preIndex].price > current.price) {
              arr[preIndex + 1] = arr[preIndex];
              preIndex--;
          }
          arr[preIndex + 1] = current;
      }
      return arr;
    }
}
};
</script>

