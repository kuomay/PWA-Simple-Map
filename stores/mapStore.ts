import { defineStore } from 'pinia'
import * as selectedConditions from 'ol/events/condition'
import * as extent from 'ol/extent'
import { getArea, getLength } from 'ol/sphere'
import type { ObjectEvent } from 'ol/Object'
import type View from 'ol/View'

export const useMapStore = defineStore('uav', () => {
  // 地圖基本資料
  const center = ref([120, 23])
  const projection = ref('EPSG:4326')
  const zoom = ref(8)
  const rotation = ref(0)

  // 開啟切換底圖功能
  const isBaseOpen = ref(false)

  const handleBaseOpen = () => {
    isBaseOpen.value = !isBaseOpen.value
  }

  // 底圖資料
  const baseLayers = [
    {
      component: 'ol-source-osm',
    },
    {
      component: 'ol-source-tile-wms',
      props: {
        layers: 'EMAP',
        url: 'https://wms.nlsc.gov.tw/wms',
        serverType: 'geoserver',
      },
    },
    {
      component: 'ol-source-tile-wms',
      props: {
        layers: 'PHOTO2',
        url: 'https://wms.nlsc.gov.tw/wms',
        serverType: 'geoserver',
      },
    },
  ]

  const baseLayerIndex = ref(0)
  const selectedBaseLayer = ref(baseLayers[0].component)

  const setBaseLayer = (layer: number) => {
    selectedBaseLayer.value = baseLayers[layer].component
    baseLayerIndex.value = layer
  }

  const getProps = () => {
    const selectedLayer = baseLayers[baseLayerIndex.value]

    return selectedLayer ? selectedLayer.props || {} : {}
  }

  // 向量圖層
  const isVectorOpen = ref(false)
  const drawEnable = ref(false)
  const drawType = ref('Point')

  const setVector = (tool: 'point' | 'line' | 'area') => {
    drawEnable.value = true

    switch (tool) {
      case 'point':
        drawType.value = 'Point'
        break
      case 'line':
        drawType.value = 'LineString'
        break
      case 'area':
        drawType.value = 'Polygon'
        break
      default:
        break
    }
  }

  const handleVectorOpen = () => {
    isVectorOpen.value = !isVectorOpen.value
    if (isVectorOpen.value === false)
      drawEnable.value = false
  }

  // 顯示向量資訊
  const selectedPosition = ref<number[]>([])
  const selectedLength = ref<number | string>('')
  const selectedArea = ref<number | string>('')
  const selectedGeometry = ref('')

  const featureSelected = (event: { selected: string | any[] }) => {
    if (event.selected.length === 1) {
      const selectedFeature = event.selected[0]

      // 以下會單純取出一個物件的名字
      const geometryType = selectedFeature.getGeometry().getType()

      selectedGeometry.value = geometryType
      selectedPosition.value = extent.getCenter(
        event.selected[0].getGeometry().extent_,
      )
      selectedPosition.value = selectedPosition.value.map(i => {
        return Number(i.toFixed(2))
      })

      if (geometryType === 'LineString') {
        // 這會取出一個物件
        const lineString = selectedFeature.getGeometry()
        let length: number = getLength(lineString, { projection: 'EPSG:4326' })
        length = Number((length / 1000).toFixed(2))
        selectedLength.value = length as number
      }
      else if (geometryType === 'Point') {
        selectedLength.value = ''
      }
      else if (geometryType === 'Polygon') {
        const polygon = selectedFeature.getGeometry()
        let area: number = getArea(polygon, { projection: 'EPSG:4326' })
        area = Number((area / 1000000).toFixed(2))
        selectedArea.value = area as number
      }
    }
    else {
      selectedPosition.value = [] as number[]
    }
  }

  // 過濾交互要素
  const selectInteactionFilter = (feature: any) => {
    const geometryType = feature.getGeometry().getType()

    return geometryType === 'Point' || geometryType === 'LineString' || geometryType === 'Polygon'
  }

  // 刪除向量資料
  const sourceLayer = ref<any | null>(null)

  const seletedDelete = (event: { selected: any[] }) => {
    const selectedFeature = event.selected[0]

    sourceLayer.value.source.removeFeature(selectedFeature)
    selectedPosition.value = [] as number[]
  }

  const handleReset = () => {
    sourceLayer.value.source.clear()
    selectedPosition.value = [] as number[]
  }

  // 定位目前使用者位置
  const view = ref<View>()
  const position = ref([])

  const geoLocChange = (event: ObjectEvent) => {
    position.value = event.target.getPosition()
    view.value?.setCenter(event.target?.getPosition())
  }

  return {
    center,
    projection,
    zoom,
    rotation,
    isBaseOpen,
    handleBaseOpen,
    setBaseLayer,
    baseLayers,
    selectedBaseLayer,
    getProps,
    isVectorOpen,
    drawEnable,
    drawType,
    setVector,
    handleVectorOpen,
    selectedConditions,
    featureSelected,
    selectInteactionFilter,
    selectedGeometry,
    selectedPosition,
    selectedLength,
    selectedArea,
    sourceLayer,
    seletedDelete,
    handleReset,
    position,
    geoLocChange,
  }
})
