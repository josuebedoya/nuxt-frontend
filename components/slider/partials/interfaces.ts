export interface classApi {
    root?: string | string[] | Record<string, boolean>
    container?: string | string[] | Record<string, boolean>
    viewport?: string | string[] | Record<string, boolean>
} // Class to containers api

export interface configSlider {
    autoPlay?: boolean
    autoScroll?: boolean
    fade?: boolean
    delay?: number
    speed?: number
    pauseOnHover?: boolean
    loop?: boolean
    isVertical?: boolean
    reverse?: boolean
    centeredItems?: boolean
    itemsByTransition?: number
    moveWithWheel?: boolean
    dragFree?: boolean
    autoDimensioned?: boolean
} // Basic Slider Config

export interface configThumbs {
    sliderConfig?: Record<string, never>,
    position?: string
    moveOnHover?: boolean,
} // Thumbs

export interface configSlide {
    class?: string,
    classActive?: string,
    padding?: string,
} // Item

export interface sliderProps {
    activeContainer?: boolean,
    sizeContainer?: string,
    isActive?: boolean
    component: never
    componentThumb?: never
    items: Array<never>
    class?: classApi
    breakPoint: Record<string | number, string | number>
    config?: configSlider
    withNavs?: boolean
    withDots?: boolean
    navsConfig?: Record<string, string | string[] | Record<string, boolean> >
    dotsConfig?: Record<string, string | string[] >
    withThumbs?: boolean
    thumbsConfig?: configThumbs
    item?: configSlide
} // All props