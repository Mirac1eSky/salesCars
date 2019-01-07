<template>
    <div class="tablePage">
        <h1>表格+分页</h1>
        <!-- 表格-->
        <v-table 
            :columns="tableConfig.columns" 
            :table-data="tableConfig.tableData" 
            :paging-index="(pageIndex-1)*pageSize">
        </v-table>
        <!-- 分页-->
        <v-pagination 
            @page-change="pageChange" 
            @page-size-change="pageSizeChange" 
            :total="total" :page-size="pageSize" 
            :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']">
        </v-pagination>
    </div>
</template>
<script>
//引入数据
//import tableDate from "../public/stub/car.json";
export default {
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            total:'',
            tableConfig: {
                tableData: [],
                columns: [
                    {
                        field: "id",
                        title: "编号",
                        width: 50,
                        columnAlign: "center"
                    },
                    {
                        field: "name",
                        title: "姓名",
                        width: 120,
                        columnAlign: "center"
                    },
                    {
                        field: "age",
                        title: "年龄",
                        width: 50,
                        columnAlign: "center",
                    },
 
                    {
                        field: "height",
                        title: "身高",
                        width: 100,
                        columnAlign: "left",
                    },
                    {
                        field: "sex",
                        title: "性别",
                        width: 50,
                        columnAlign: "center",
                    },
                    {
                        field: "score",
                        title: "成绩",
                        width: 80,
                        columnAlign: "center",
                    }
                ]
            }
        };
    },
    created() {
        this.getTableData();
    },
    methods: {
        getTableData() {
            this.tableConfig.tableData = tableDate.slice(
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize
            );
            this.total = tableDate.length;
        },
        pageChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.getTableData();
            console.log(pageIndex);
        },
        pageSizeChange(pageSize) {
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.getTableData();
        }
    }
};
</script>
