export const wordChartConfig = {
  series: [
    {
      type: "wordCloud",
      shape: "circle", //circle cardioid diamond triangle-forward triangle
      left: -100,
      right: -100,
      top: 0,
      right: 0,
      width: "150%",
      height: "100%",
      gridSize: 8, //值越大，word间的距离越大，单位像素
      sizeRange: [10, 32], //word的字体大小区间，单位像素
      rotationRange: [-90, 90], //word的可旋转角度区间
      textStyle: {
        normal: {
          color: function () {
            return (
              "rgb(" +
              [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
              ].join(",") +
              ")"
            );
          },
        },
        emphasis: {
          shadowBlur: 2,
          shadowColor: "#000",
        },
      },
      data: [
        {
          name: "在线教育",
          value: 3000,
          textStyle: {
            normal: { color: "#f52f55" },
            emphasis: {},
          },
        },
        {
          name: "学习",
          value: 2181,
        },
        {
          name: "作业",
          value: 1386,
        },
        {
          name: "大学",
          value: 2055,
        },
        {
          name: "英文",
          value: 2467,
        },
        {
          name: "资料",
          value: 2244,
        },
        {
          name: "网课",
          value: 1898,
        },
        {
          name: "老师",
          value: 1484,
        },
        {
          name: "少儿",
          value: 3865,
        },
        {
          name: "微信",
          value: 897,
        },
        {
          name: "互联网",
          value: 847,
        },
        {
          name: "数学",
          value: 1366,
        },
        {
          name: "视频",
          value: 555,
        },
        {
          name: "入门",
          value: 550,
        },
        {
          name: "互联网+",
          value: 2222,
        },
        {
          name: "课程",
          value: 366,
        },
        {
          name: "改作业",
          value: 360,
        },
        {
          name: "英语",
          value: 282,
        },
        {
          name: "高等教育",
          value: 273,
        },
        {
          name: "直播课",
          value: 265,
        },
      ],
    },
  ],
  backgroundColor: "rgba(255, 255, 255, 0.9)",
};

export const mapChartConfig = {
  tooltip: {
    formatter: function (params) {
      const data = params.data;
      return data.name + "<br />舆论文章数：" + data.value;
    },
  },
  visualMap: {
    type: "piecewise",
    splitNumber: 6,
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 5,
    textGap: 5,
    textStyle: {
      fontSize: 10,
      color: "#b0c2f9",
    },
    min: 0,
    max: 600,
    calculable: true,
    seriesIndex: [0],
  },
  geo: {
    map: "china",
    roam: true, //开启鼠标缩放和漫游
    zoom: 1, //地图缩放级别
    selectedMode: "single",
    top: 10,
    bottom: 10,
    layoutCenter: ["50%", "50%"],
    //layoutSize: "100%", //保持地图宽高比
    label: {
      show: true,
      fontSize: 10,
      color: "#ceac09",
    },
  },
  series: [
    {
      name: "地域分布",
      type: "map",
      geoIndex: 0,
    },
  ],
};
export const trendChartConfig = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  legend: {
    left: "center",
    bottom: 3,
    itemWidth: 15,
    itemHeight: 10,
    textStyle: {
      fontSize: 12,
      color: "#b0c2f9",
    },
    data: ["积极", "消极", "中性", "文章总数"],
  },
  grid: {
    top: 40,
    bottom: 50,
    left: 60,
    right: 60,
  },
  xAxis: {
    type: "category",
    axisLine: {
      lineStyle: { color: "#b0c2f9" },
    },
    axisTick: { show: false },
    axisLabel: {
      fontSize: 12,
      color: "#b0c2f9",
    },
  },
  yAxis: [
    {
      name: "文章数量/篇",
      type: "value",
      splitNumber: 5,
      axisLine: {
        lineStyle: { color: "#b0c2f9" },
      },
      splitLine: { show: false },
      axisTick: { color: "#b0c2f9" },
      axisLabel: {
        fontSize: 12,
        color: "#b0c2f9",
        formatter: (value, index) => {
          return parseInt(value / 10000) + "千篇";
        },
      },
    },
  ],
  // visualMap: {
  // 	show: false,
  // 	seriesIndex: 2,
  // 	dimension: 0,
  // 	pieces: [{
  // 		lte: 9,
  // 		color: "rgba(176, 58, 91, 1)"
  // 	}, {
  // 		gt: 9,
  // 		lte: 11,
  // 		color: "rgba(176, 58, 91, 0.5)"
  // 	}]
  // },
  series: [],
};

export const sectorChartConfig = {
  tooltip: {
    trigger: "item",
    formatter: "{b0}<br />文章数：{c0}<br />占比：{d0}%",
  },
  legend: {
    type: "scroll",
    orient: "vertical",
    padding: 0,
    top: 15,
    right: 0,
    itemGap: 5,
    itemWidth: 10,
    itemHeight: 10,
    textStyle: {
      fontSize: 10,
      color: "#b0c2f9",
    },
  },
  series: [
    {
      name: "采集平台比例",
      type: "pie",
      center: ["47%", "55%"],
      radius: ["30%", "85%"],
    },
  ],
};
export const dataOpt = {
  activeIndex: 0,
  csrcChart: null,
  wordChart: null,
  mapChart: null,
  trendChart: null,
  // baseUrl: "http://192.168.31.160:8888",
  baseUrl: "http://192.168.3.136:8888",
  // baseUrl: "http://192.168.2.105:8888",
};
