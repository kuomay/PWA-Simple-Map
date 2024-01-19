<script setup lang="ts">
const mapStore = useMapStore()
</script>

<template>
  <div class="demo-space-x flex-row" v-if="mapStore.isVectorOpen">
    <VBtn
      size="38"
      color="#FFF9C4"
      @click="mapStore.setVector('point')"
      class="mr-2"
    >
      <VIcon
        icon="mdi-vector-point"
        size="22"
      />
    </VBtn>
    <VBtn
      size="38"
      color="#FFF9C4"
      @click="mapStore.setVector('line')"
      class="mr-2"
    >
      <VIcon
        icon="mdi-chart-line-variant"
        size="22"
      />
    </VBtn>
    <VBtn
      size="38"
      color="#FFF9C4"
      @click="mapStore.setVector('area')"
      class="mr-2"
    >
      <VIcon
        icon="mdi-triangle-outline"
        size="22"
      />
    </VBtn>
  </div>
</template>
