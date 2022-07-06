// components/search/search.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: String,
            value: ""
        },
        placeholder:{
            type:String,
            value:"搜索内容"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 输入框输入文字时
         */
        bindinput(event: any) {
            const { detail } = event;
            const { value } = detail;
            this.setData({
                value
            })
        },
        /**
         * 当搜索按钮点击时
         */
        bindtap(event: any) {
            this.triggerEvent("submit", event)
        }
    }
})
