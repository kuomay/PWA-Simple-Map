<script setup lang="ts">
import hereIcon from '@/assets/images/location.png'
import { storeToRefs } from 'pinia';
import { useMapStore } from '~/stores/mapStore';

const mapStore = useMapStore()
const { center, projection, zoom, rotation, sourceLayer, position } = storeToRefs(mapStore)
</script>

<template>
  <div class="map-container">
    <UavBtnGroup />
    <BaseLayerPop />
    <uavPop />
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 100vh; width: 100vw;"
    >
      <ol-view
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />

      <!-- * 切換底圖 -->
      <ol-tile-layer :zIndex="1">
        <component
          :is="mapStore.selectedBaseLayer"
          v-bind="mapStore.getProps()" />
      </ol-tile-layer>

      <!-- * 比例尺與縮圖 -->
      <ol-overviewmap-control collapsed>
        <ol-tile-layer >
          <component
            :is="mapStore.selectedBaseLayer"
            v-bind="mapStore.getProps()" />
        </ol-tile-layer>
      </ol-overviewmap-control>
      <ol-scaleline-control />

      <!-- * 向量圖層 -->
      <ol-vector-layer zIndex="1000">
        <ol-source-vector
          ref="sourceLayer"
          :projection="projection"
         >
          <ol-interaction-draw
            v-if="mapStore.drawEnable"
            :type="mapStore.drawType"
          >
          </ol-interaction-draw>

          <ol-interaction-modify
            v-if="mapStore.drawEnable"
          >
          </ol-interaction-modify>
        </ol-source-vector>

        <ol-style>
          <!-- 線和邊的顏色 -->
          <ol-style-stroke color="red" :width="2"></ol-style-stroke>
          <!-- 面積內裡著色 -->
          <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
          <!-- 點的顏色 -->
          <ol-style-circle :radius="7">
            <ol-style-fill color="red"></ol-style-fill>
          </ol-style-circle>
        </ol-style>
      </ol-vector-layer>

      <!-- * 顯示資訊 -->
      <ol-interaction-select
        @select="mapStore.featureSelected"
        :condition="mapStore.selectedConditions.singleClick"
        :filter = "mapStore.selectInteactionFilter"
        v-if="!mapStore.drawEnable"
      >
        <ol-style>
          <ol-style-stroke color="orange" :width="10"></ol-style-stroke>
          <!-- 多邊形內部著色 -->
          <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
          <ol-style-circle :radius="7">
            <ol-style-fill color="gray"></ol-style-fill>
          </ol-style-circle>
        </ol-style>
      </ol-interaction-select>

      <ol-overlay
        :position="mapStore.selectedPosition"
        v-if="Array.isArray(mapStore.selectedPosition) && !mapStore.drawEnable"
      >
          <div class="overlay-content" v-if="mapStore.selectedGeometry === 'Point'">
            {{ mapStore.selectedPosition }}
          </div>
          <div class="overlay-content" v-if="mapStore.selectedGeometry === 'LineString'">
            {{ mapStore.selectedLength }} km
          </div>
          <div class="overlay-content" v-if="mapStore.selectedGeometry === 'Polygon'">
            {{ mapStore.selectedArea }} km²
          </div>
      </ol-overlay>

      <!-- * 刪除選中資訊 -->
      <ol-interaction-select
        @select="mapStore.seletedDelete"
        :condition="mapStore.selectedConditions.altKeyOnly"
        :filter = "mapStore.selectInteactionFilter"
        v-if="!mapStore.drawEnable"
      >
      </ol-interaction-select>

      <!-- * 及時定位 -->
      <ol-geolocation :projection="projection" @change:position="mapStore.geoLocChange">
        <template>
          <ol-vector-layer :zIndex="2">
            <ol-source-vector>
              <ol-feature ref="positionFeature">
                <ol-geom-point :coordinates="position"></ol-geom-point>
                <ol-style>
                  <ol-style-icon :src="hereIcon" :scale="0.1"></ol-style-icon>
                </ol-style>
              </ol-feature>
            </ol-source-vector>
          </ol-vector-layer>
        </template>
      </ol-geolocation>
    </ol-map>
  </div>
</template>

<style lang="scss">
.overlay-content {
  background: #c84031;
  color: white;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: 16px;
}

// 以下 selector 會在編譯後出現
.ol-scale-line {
    left: auto;
    bottom: 12rem;
    right: 2rem;
}

.ol-overviewmap.ol-uncollapsible {
  left: auto;
  right: 2rem;
  bottom: 2rem;
}

.ol-zoom{
  top: auto;
  left: auto;
  right: 2rem;
  bottom: 15rem;
}
</style>
