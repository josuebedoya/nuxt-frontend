import type {sliderProps} from "~/types/components/slider";

export const sliderDefaults = {
  isActive: true,
  breakPoint: {0: 1, md: 2, lg: 3, xl: 4},
  config: {
    autoPlay: true,
    autoScroll: false,
    fade: false,
    delay: 2500,
    speed: 1,
    pauseOnHover: false,
    loop: false,
    isVertical: false,
    reverse: false,
    centeredItems: false,
    itemsByTransition: 1,
    moveWithWheel: false,
    dragFree: false,
    autoDimensioned: false
  },
  activeContainer: false,
  sizeContainer: '2xl:container',
  withNavs: true,
  withDots: true,
  navsConfig: {
    position: 'bottom-center'
  },
  dotsConfig: {
    position: 'bottom'
  },
  withThumbs: false,
  thumbsConfig: {
    sliderConfig: {},
    position: 'left',
    moveOnHover: false
  },
  item: {
    padding: 'p-4',
    classActive: ''
  }
} satisfies Partial<sliderProps>
