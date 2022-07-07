// pages/goods/detail/index.ts
import Toast from 'tdesign-miniprogram/toast/index';

const obj2Params = (obj:any = {}, encode = false) => {
  const result:any = [];
  Object.keys(obj).forEach((key) =>
    result.push(`${key}=${encode ? encodeURIComponent(obj[key]) : obj[key]}`),
  );

  return result.join('&');
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spuId:0,
    minSalePrice: 10,
    maxLinePrice: 20,
    soldNum: 1000,
    cartNum: 0,
    buttonType: 1,
    buyNum: 1,
    buyType: 0,
    soldout: false, // 是否下架
    isStock: true, // 是否还有库存
    isSpuSelectPopupShow: false,
    isAllSelectedSku: false,
    specImg: "",
    primaryImage: "/images/goods/demo1.jpeg",
    details: {
      title: "意式布艺沙发客厅小户型baxter大象耳朵极简科技布沙发设计师北欧",
      intro: "123",
      images: [
        "/images/goods/demo1.jpeg",
        "/images/goods/demo2.jpeg",
        "/images/goods/demo3.jpeg"
      ],
      desc: [
        "/images/goods/demo1.jpeg",
        "/images/goods/demo2.jpeg",
        "/images/goods/demo3.jpeg"
      ],
      specList: [
        {
          specId: 1,
          specValueList: [
            {
              image: "",
              specId: 1,
              specValue: "白色",
              specValueId: 10000
            }
          ],
          title: "颜色"
        }
      ]
    },
    skuArray: [
      {
        quantity: 100,
        skuId: 1,
        specInfo: [
          {
            specId: 1,
            specTitle: "",
            specValue: "黑色",
            specValueId: 10000
          }
        ]
      }
    ],
    jumpArray: [
      {
        title: '首页',
        url: '/pages/index/index',
        iconName: 'home',
      },
      {
        title: '购物车',
        url: '/pages/cart/index',
        iconName: 'cart',
        showCartNum: true,
      },
    ],
    skuList:[],
    selectItem:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  toNav(e: any) {
    const { url } = e.detail;
    wx.switchTab({
      url: url,
    });
  },

  handlePopupHide() {
    this.setData({
      isSpuSelectPopupShow: false,
    });
  },

  showSkuSelectPopup(type: number) {
    this.setData({
      buyType: type || 0,
      outOperateStatus: type >= 1,
      isSpuSelectPopupShow: true,
    });
  },

  buyItNow() {
    this.showSkuSelectPopup(1);
  },

  toAddCart() {
    this.showSkuSelectPopup(2);
  },

  showCurImg(e: any) {
    const { index } = e.detail;
    const { images } = this.data.details;
    wx.previewImage({
      current: images[index],
      urls: images, // 需要预览的图片http链接列表
    });
  },

  onPageScroll({ scrollTop }) {
    const goodsTab = this.selectComponent('#goodsTab');
    goodsTab && goodsTab.onScroll(scrollTop);
  },

  chooseSpecItem(e: any) {
    const { specList } = this.data.details;
    const { selectedSku, isAllSelectedSku } = e.detail;
    if (!isAllSelectedSku) {
      this.setData({
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      isAllSelectedSku,
    });
    this.getSkuItem(specList, selectedSku);
  },

  getSkuItem(specList: any, selectedSku: any[]) {
    const { skuArray, primaryImage } = this.data;
    const selectedSkuValues = this.getSelectedSkuValues(specList, selectedSku);
    let selectedAttrStr = ` 件  `;
    selectedSkuValues.forEach((item: any) => {
      selectedAttrStr += `，${item.specValue}  `;
    });
    // eslint-disable-next-line array-callback-return
    const skuItem: any = skuArray.filter((item: any) => {
      let status = true;
      (item.specInfo || []).forEach((subItem: any) => {
        if (
          !selectedSku[subItem.specId] ||
          selectedSku[subItem.specId] !== subItem.specValueId
        ) {
          status = false;
        }
      });
      if (status) return item;
    });
    this.selectSpecsName(selectedSkuValues.length > 0 ? selectedAttrStr : '');
    if (skuItem) {
      this.setData({
        selectItem: skuItem,
        selectSkuSellsPrice: skuItem.price || 0,
      });
    } else {
      this.setData({
        selectItem: null,
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      specImg: skuItem && skuItem.skuImage ? skuItem.skuImage : primaryImage,
    });
  },

  // 获取已选择的sku名称
  getSelectedSkuValues(skuTree: any, selectedSku: any) {
    const normalizedTree: any = this.normalizeSkuTree(skuTree);
    return Object.keys(selectedSku).reduce((selectedValues:any, skuKeyStr) => {
      const skuValues = normalizedTree[skuKeyStr];
      const skuValueId = selectedSku[skuKeyStr];
      if (skuValueId !== '') {
        const skuValue:any = skuValues.filter((value: any) => {
          return value.specValueId === skuValueId;
        })[0];
        skuValue && selectedValues.push(skuValue);
      }
      return selectedValues;
    }, []);
  },

  normalizeSkuTree(skuTree:any) {
    const normalizedTree:any = {};
    skuTree.forEach((treeItem:any) => {
      normalizedTree[treeItem.specId] = treeItem.specValueList;
    });
    return normalizedTree;
  },

  selectSpecsName(selectSpecsName:any) {
    if (selectSpecsName) {
      this.setData({
        selectedAttrStr: selectSpecsName,
      });
    } else {
      this.setData({
        selectedAttrStr: '',
      });
    }
  },

  addCart() {
    const { isAllSelectedSku } = this.data;
    Toast({
      context: this,
      selector: '#t-toast',
      message: isAllSelectedSku ? '点击加入购物车' : '请选择规格',
      icon: '',
      duration: 1000,
    });
  },

  gotoBuy(type?:any) {
    const { isAllSelectedSku, buyNum } = this.data;
    if (!isAllSelectedSku) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请选择规格',
        icon: '',
        duration: 1000,
      });
      return;
    }
    this.handlePopupHide();
    const query = {
      quantity: buyNum,
      storeId: '1',
      spuId: this.data.spuId,
      goodsName: this.data.details.title,
      skuId:
        type === 1 ? this.data.skuList[0].skuId : this.data.selectItem.skuId,
    };
    let urlQueryStr = obj2Params({
      goodsRequestList: JSON.stringify([query]),
    });
    urlQueryStr = urlQueryStr ? `?${urlQueryStr}` : '';
    const path = `/pages/order/order-confirm/index${urlQueryStr}`;
    wx.navigateTo({
      url: path,
    });
  },

  specsConfirm() {
    const { buyType } = this.data;
    if (buyType === 1) {
      this.gotoBuy();
    } else {
      this.addCart();
    }
    // this.handlePopupHide();
  },

  changeNum(e:any) {
    this.setData({
      buyNum: e.detail.buyNum,
    });
  }
})