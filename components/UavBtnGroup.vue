<script setup>
import VectorPop from './VectorPop.vue';
const mapStore = useMapStore()
</script>

<template>
  <div class="btn-group">
    <VBtn
      size="38"
      color="#DCE775"
      @click="mapStore.handleBaseOpen">
      <VIcon
        icon="mdi-layers"
        size="22"
      />
    </VBtn>

    <div class="vector-btn">
      <VectorPop />
      <VBtn
        size="38"
        color="#FFB74D"
        @click="mapStore.handleVectorOpen"
      >
        <VIcon
          icon="mdi-tag-edit-outline"
          size="22"
        />
      </VBtn>
    </div>

    <VBtn
      size="38"
      color="#F06292"
      @click="mapStore.handleReset"
    >
      <VIcon
        icon="mdi-refresh"
        size="22"
      />
    </VBtn>
  </div>
</template>

<style lang="scss" scoped>
.btn-group{
  position: absolute;
  top: 15%;
  right: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
}
.vector-btn{
  display: flex;
}
</style>
