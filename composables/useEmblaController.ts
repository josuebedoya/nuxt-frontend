import type {EmblaCarouselType} from 'embla-carousel'
import type {Ref} from 'vue'

export function useEmblaController(refApi: Ref<{ emblaApi?: EmblaCarouselType } | null>, props: Ref<any>) {
    const api = () => refApi.value?.emblaApi
    const getItemsByTransition = () => props.value?.config?.itemsByTransition || 1
    const getLoop = () => props.value?.config?.loop ?? false
    const getItems = () => props.value?.items || []
    const canScrollPrev = ref(false)
    const canScrollNext = ref(false)
    const selectedIndex = ref(0)
    const scrollSnaps = ref([])

    const mainController = () => {
        if (!api()) return

        api()?.on('select', () => {
            requestAnimationFrame(() => {
                const index = (api()?.selectedScrollSnap() || 0) * getItemsByTransition()
                onSelect(index)
            })
            selectedIndex.value = api()?.selectedScrollSnap() || 0
            canScrollNext.value = api()?.canScrollNext() || false;
            canScrollPrev.value = api()?.canScrollPrev() || false;
        })
        api()?.on("init", onInit)
        api()?.on("init", () => {
            canScrollNext.value = api()?.canScrollNext() || false;
            canScrollPrev.value = api()?.canScrollPrev() || false;
        })
    }
    const onSelect = (index: number) => {
        const indexes: number[] = [];

        for (let i = 0; i < getItemsByTransition(); i++) {
            const current = index + i;
            indexes.push(getLoop() ? current % getItems() : current);
        }

        return indexes;
    }
    const select = (index: number) => {
        const slideGroupIndex = Math.floor(index / getItemsByTransition())

        api()?.scrollTo(slideGroupIndex)
        onSelect(slideGroupIndex * getItemsByTransition())
    }
    const onInit = () => {
        scrollSnaps.value = api()?.scrollSnapList() || [];
    }
    const scrollTo = (index: number) => api()?.scrollTo(index);
    const scrollPrev = () => api()?.scrollPrev()
    const scrollNext = () => api()?.scrollNext()
    const stop = (method: string = 'autoplay') => {
        const pluginMethod = api?.plugins()?.[method]

        if (pluginMethod) pluginMethod.stop()
    }
    const play = (method: string = 'autoplay') => {
        const pluginMethod = api?.plugins()?.[method]

        if (pluginMethod) pluginMethod.play()
    }

    return {
        mainController,
        onSelect,
        select,
        onInit,
        scrollTo,
        scrollPrev,
        scrollNext,
        play,
        stop,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps
    }
}