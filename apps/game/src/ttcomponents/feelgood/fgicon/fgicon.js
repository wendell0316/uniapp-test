import { isInLynxRuntime } from './../common/env'; // @ts-ignore

var endpoints = {
  "thumb-aweme": "ea01"
};
Component({
  properties: {
    size: {
      type: Number,
      value: 36
    },
    color: {
      type: String,
      value: 'black'
    },
    content: {
      type: String,
      value: '',
      observer: function observer(newVal) {
        var character = this.data.characterMap[newVal];
        this.setData({
          character: "&#x".concat(character, ";")
        });
      }
    }
  },
  data: {
    character: '',
    characterMap: endpoints,
    isLynxRuntime: false
  },

  created() {
    if (isInLynxRuntime) {
      this.setData({
        isLynxRuntime: true
      });
    }
  }

});