import { defineStore } from 'pinia';

interface IState {
  userInfo: UniApp.UserInfo & { userId: string, sessionId: string } | null;
  menuInfo: {
    top: number;
    height: number;
    right: number;
    left: number;
    bottom: number;
  } | null;
  utmInfo: {
    utm_source: string;
    utm_medium: string;
  } | null;
}
export const useCommonStore = defineStore('common', {
  state: (): IState => {
    return {
      userInfo: null,
      menuInfo: null,
      utmInfo: null,
    };
  },
  actions: {
    setUtmInfo(utmInfo: IState['utmInfo']) {
      this.utmInfo = utmInfo;
    },
    setUserInfo(userInfo: IState['userInfo']) {
      this.userInfo = userInfo;
    },
    setMenuInfo(menuInfo: IState['menuInfo']) {
      this.menuInfo = menuInfo;
    },
  },
});
