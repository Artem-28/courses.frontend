<script setup lang="ts">
import { onMounted } from 'vue';
/* Composition */
// import you composition api...
import { useBlockStore } from 'stores/models/blockStore';

/* Components */
// import you components...
import ConstructorScene from 'components/constructor/scene/ConstructorScene.vue';
import BlockConstructor from 'components/constructor/blocks/BlockConstructor.vue';

/* Types */
// declare components component...
import { BlockData } from 'src/types/models';

/* Props */
// property default value...

/* Emits */

/* Data */
// declare reactive variables...

const blockData: BlockData[] = [
  {
    id: 1,
    position: { x: 100, y: 100 },
    type: ''
  },
  {
    id: 2,
    position: { x: 400, y: 100 },
    type: ''
  }
];

/* Composition */
// declare you composition api...
const blockStore = useBlockStore();

/* Life hooks */
// life cycle hooks...
onMounted(() => {
  blockStore.create(blockData);
});

/* Computed */
// you computational properties...

/* Methods */
// promote your methods...
</script>

<template>
  <ConstructorScene>
    <template v-slot:default="{ zoom, confines }">
      <BlockConstructor
        v-for="block in blockStore.items"
        :key="block.id"
        :block="block"
        :confines="confines"
        :zoom="zoom"
      />
    </template>
  </ConstructorScene>
</template>

<style scoped lang="scss">
/* Variables */
// declare you variables scss...

/* Selector */
// style component...
</style>
