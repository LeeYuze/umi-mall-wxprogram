// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
    data: {
        searchValue: "",
        categoryList: [
            {
                picUrl: "/images/category/sf.png",
                text: "沙发"
            },
            {
                picUrl: "/images/category/yg.png",
                text: "衣柜"
            },
            {
                picUrl: "/images/category/yz.png",
                text: "椅子"
            },
            {
                picUrl: "/images/category/c.png",
                text: "床"
            }
        ],
        bannerList: [
            {
                image: `/images/banner/demo2.jpg`,
            },
            {
                image: `/images/banner/demo3.jpg`,
            },
        ],
        tabsList: [
            {
                label: "猜你喜欢",
                value: "0"
            },
            {
                label: "沙发",
                value: "1"
            },
            {
                label: "衣柜",
                value: "2"
            },
            {
                label: "椅子",
                value: "3"
            },
            {
                label: "床",
                value: "4"
            },
        ],
        goodsList: [
            {
                spuId: 1,
                thumb: "https://yanxuan-item.nosdn.127.net/ff82bfbf456eb739ee3ace4c18137856.png?type=webp&quality=95&thumbnail=245x245&imageView",
                title: "趣凡·真皮电动功能沙发",
                price: 4499,
                originPrice: 4899
            },
            {
                spuId: 2,
                thumb: "https://yanxuan-item.nosdn.127.net/42f17bbc53aec6ec90ace54ad271329f.png?type=webp&quality=95&thumbnail=245x245&imageView",
                title: "升级粒子更舒适，日式和风懒人沙发",
                price: 439,
                originPrice: 599
            },
            {
                spuId: 2,
                thumb: "https://yanxuan-item.nosdn.127.net/42f17bbc53aec6ec90ace54ad271329f.png?type=webp&quality=95&thumbnail=245x245&imageView",
                title: "升级粒子更舒适，日式和风懒人沙发",
                price: 439,
                originPrice: 599
            },
            {
                spuId: 1,
                thumb: "https://yanxuan-item.nosdn.127.net/ff82bfbf456eb739ee3ace4c18137856.png?type=webp&quality=95&thumbnail=245x245&imageView",
                title: "趣凡·真皮电动功能沙发",
                price: 4499,
                originPrice: 4899
            },
            {
                spuId: 1,
                thumb: "https://yanxuan-item.nosdn.127.net/ff82bfbf456eb739ee3ace4c18137856.png?type=webp&quality=95&thumbnail=245x245&imageView",
                title: "趣凡·真皮电动功能沙发",
                price: 4499,
                originPrice: 4899
            },
            {
                spuId: 2,
                thumb: "https://yanxuan-item.nosdn.127.net/42f17bbc53aec6ec90ace54ad271329f.png?type=webp&quality=95&thumbnail=245x245&imageView",
                title: "升级粒子更舒适，日式和风懒人沙发",
                price: 439,
                originPrice: 599
            }
        ]
    },
    onLoad() {
    },
    /**
     * 搜索框-搜索按钮被点击
     */
    searchOnSubmitHandle() {
        console.log(this.data.searchValue)
    },
    /**
     * 下拉刷新
     */
    onPullDownRefresh() {
        wx.stopPullDownRefresh()
    },
    onClickGoodsThumb(e: any) {
        wx.navigateTo(
          {
            url:"/pages/goods/detail/index"
          }
        )
    },
    onClickGoods(e: any) {
      wx.navigateTo(
        {
          url:"/pages/goods/detail/index"
        }
      )
    }
})
