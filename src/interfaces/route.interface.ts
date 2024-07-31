export interface Route {
    path: string;
    component: {
      load: (params?: any) => Promise<string>;
      initEventListeners?: (params?: any) => void;
    };
  }