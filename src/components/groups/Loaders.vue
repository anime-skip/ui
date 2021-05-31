<template>
  <Group title="Loaders">
    <div class="flex flex-col items-center space-y-4">
      <LoadingOverlay is-loading class="bg-error rounded-md p-4">
        <Body1> Some really long body paragraph 1</Body1>
        <Body1> Some really long body paragraph 2</Body1>
      </LoadingOverlay>

      <Loading size="sm" />
      <Loading />
      <Loading size="lg" />
    </div>
  </Group>
</template>
