import { rollNum } from "../utils/index.js";
import {
  dataOpt,
  wordChartConfig,
  mapChartConfig,
  trendChartConfig,
  sectorChartConfig,
} from "../config/index.js";
$(function () {
  //获取当天日期
  (function () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    $("#nowDate").html(year + "年" + month + "月" + day + "日");
  })();
  const vm = new Vue({
    el: "#app",
    data: function () {
      return dataOpt;
    },
    mounted() {
      this.showCount();
      //https://github.com/ecomfe/echarts-wordcloud
      // 词云
      //初始化echarts实例
      this.wordChart = echarts.init(
        document.getElementById("wordChart"),
        "shine"
      );
      this.wordChart.setOption(wordChartConfig);
      //获取地域分布数据
      this.mapChart = echarts.init(
        document.getElementById("mapChart"),
        "shine"
      );
      this.mapChart.setOption(mapChartConfig);
      this.updateMapChart();
      // 趋势图
      this.trendChart = echarts.init(
        document.getElementById("trendChart"),
        "shine"
      );
      this.trendChart.setOption(trendChartConfig);
      this.updateTrendChart();
      //获取信息采集平台数据
      this.csrcChart = echarts.init(
        document.getElementById("csrcChart"),
        "shine"
      );
      this.csrcChart.setOption(sectorChartConfig);
      this.updateSectorChart();
      this.injectEvent();
    },
    methods: {
      //获取统计数据
      showCount() {
        $.ajax({
          url: "data/count-data.json",
          dataType: "json",
        })
          .done(function (data) {
            //console.log('Data: ', data);
            rollNum("listedCompany", 0, data.listed_companies_total);
            rollNum("listedSecurity", 0, data.listed_securities_total);
            rollNum("totalMarket", 0, data.total_market_value, 2);
            rollNum("circulationMarket", 0, data.circulation_market_value, 2);
            rollNum("shRatio", 0, data.sh_pe_ratio, 2);
            rollNum("szRatio", 0, data.sz_pe_ratio, 2);
          })
          .fail(function (jqXHR, textStatus) {
            console.log("Ajax Error: ", textStatus);
          });
      },
      updateMapChart() {
        $.ajax({
          url: "data/region-count.json",
          dataType: "json",
        })
          .done(function () {
            $("#mapChart").addClass("chart-done");
          })
          .done((data) => {
            //console.log('Data: ', data);
            const chartData = [];
            for (let i in data) {
              chartData.push({
                name: data[i].region,
                value: data[i].count,
              });
            }
            this.mapChart.setOption({
              series: [
                {
                  name: "地域分布",
                  data: chartData,
                },
              ],
            });
          })
          .fail(function (jqXHR) {
            console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
          });
      },
      updateTrendChart() {
        $.ajax({
          url: "data/month-count.json",
          dataType: "json",
        })
          .done(function () {
            $("#trendChart").addClass("chart-done");
          })
          .done((data) => {
            //console.log('Data: ', data);
            const xData = [];
            const yData1 = [];
            const yData2 = [];
            const yData3 = [];
            const yData4 = [];
            for (let i in data) {
              xData.push(data[i].month);
              const {
                sh_market_capitalization,
                sh_transaction_amount,
                sh_pe_ratio,
              } = data[i];
              yData1.push(sh_market_capitalization.toFixed(0));
              yData2.push(sh_transaction_amount.toFixed(0));
              yData3.push(sh_pe_ratio.toFixed(0) * 1000);
              const sum =
                sh_market_capitalization + sh_transaction_amount + sh_pe_ratio;
              yData4.push(sum.toFixed(0));
            }
            this.trendChart.setOption({
              xAxis: {
                data: xData,
              },
              series: [
                {
                  name: "积极",
                  type: "bar",
                  data: yData1,
                },
                {
                  name: "消极",
                  type: "bar",
                  data: yData2,
                },
                ,
                {
                  name: "中性",
                  type: "bar",
                  data: yData3,
                },
                {
                  name: "总数",
                  type: "line",
                  data: yData4,
                },
              ],
            });
          })
          .fail(function (jqXHR) {
            console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
          });
      },
      updateSectorChart() {
        $.ajax({
          url: "data/csrc-industry.json",
          dataType: "json",
        })
          .done(function () {
            $("#csrcChart").addClass("chart-done");
          })
          .done((data) => {
            //console.log('Data: ', data);
            const chartData = [];
            for (let i in data) {
              chartData.push({
                name: data[i].alias,
                value: data[i].stock,
              });
            }
            this.csrcChart.setOption({
              series: [
                {
                  name: "CSRC行业分类",
                  data: chartData,
                },
              ],
            });
          })
          .fail(function (jqXHR) {
            console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
          });
      },
      injectEvent() {
        //浏览器窗口大小变化时，重置报表大小
        window.addEventListener("resize", () => {
          this.wordChart.resize();
          this.mapChart.resize();
          this.csrcChart.resize();
          this.trendChart.resize();
        });
      },
    },
  });
});
