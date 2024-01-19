<script setup lang="ts">
import OSM from '@/assets/images/base-layers/osm.png'
import NLSC_EMAP from '@/assets/images/base-layers/NLSC_EMAP.png'
import NLSC_PHOTO2 from '@/assets/images/base-layers/NLSC_PHOTO2.png'

const mapStore = useMapStore()
</script>

<template>
  <VDialog
    v-model="mapStore.isBaseOpen"
    width="500"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="mapStore.isBaseOpen = !mapStore.isBaseOpen" />

    <!-- Dialog Content -->
    <VCard title="Switch Base Layers">
      <!-- OSM -->
      <VRow
        align="center"
        class="ma-1"
      >
        <VCol cols="4">
          <div>OSM</div>
        </VCol>
        <VCol>
          <VAvatar
            :size="64"
            class="btn-img"
            @click="mapStore.setBaseLayer(0)"
          >
            <VImg :src="OSM" />
            <VTooltip
              activator="parent"
              location="bottom"
            >
              Open Street Map
            </VTooltip>
          </VAvatar>
        </VCol>
      </VRow>
      <!-- NLSC -->
      <VRow
        align="center"
        class="ma-1"
      >
        <VCol cols="4">
          <div>NLSC</div>
        </VCol>
        <VCol>
          <VAvatar
            :size="64"
            class="btn-img"
            @click="mapStore.setBaseLayer(1)"
          >
            <VImg :src="NLSC_EMAP" />
            <VTooltip
              activator="parent"
              location="bottom"
            >
              台灣通用版電子地圖
            </VTooltip>
          </VAvatar>
          <VAvatar
            :size="64"
            class="btn-img"
            @click="mapStore.setBaseLayer(2)"
          >
            <VImg :src="NLSC_PHOTO2" />
            <VTooltip
              activator="parent"
              location="bottom"
            >
              台灣通用正射影像
            </VTooltip>
          </VAvatar>
        </VCol>
      </VRow>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.btn-img{
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 0.5rem;
  cursor: pointer;
}
</style>
