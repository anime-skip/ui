<template>
  <Group title="Loaders">
    <div class="as-flex as-flex-col as-items-center as-space-y-4">
      <LoadingOverlay is-loading class="as-bg-error as-rounded-md as-p-4">
        <Body1> Some really long body paragraph 1</Body1>
        <Body1> Some really long body paragraph 2</Body1>
      </LoadingOverlay>

      <Loading size="sm" />
      <Loading />
      <Loading size="lg" />
    </div>
  </Group>
</template>
