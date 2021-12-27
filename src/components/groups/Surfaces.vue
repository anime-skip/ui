<template>
  <Group title="Surfaces">
    <div class="as-grid as-grid-flow-row as-grid-cols-2 as-gap-4">
      <Card :elevation="0" class="as-text-on-surface">
        <Body1 class="as-p-4 as-text-on-surface">Elevation 0</Body1>
      </Card>
      <Card class="as-text-on-surface">
        <Body1 class="as-p-4">Default, Elevation 1</Body1>
      </Card>
      <Card :elevation="2" class="as-text-on-surface">
        <Body1 class="as-p-4 as-text-on-surface">Elevation 2</Body1>
      </Card>
      <Card :elevation="3" class="as-text-on-surface">
        <Body1 class="as-p-4 as-text-on-surface">Elevation 3</Body1>
      </Card>
      <Card :elevation="4" class="as-text-on-surface">
        <Body1 class="as-p-4 as-text-on-surface">Elevation 4</Body1>
      </Card>
      <Card :elevation="6" class="as-text-on-surface">
        <Body1 class="as-p-4 as-text-on-surface">Elevation 6</Body1>
      </Card>
      <Card :elevation="8" class="as-text-on-surface">
        <Body1 class="as-p-4 as-text-on-surface">Elevation 8</Body1>
      </Card>
      <Card :elevation="12" class="as-text-on-surface">
        <Body1 class="as-p-4 as-text-on-surface">Elevation 12</Body1>
      </Card>
      <Card :elevation="16" class="as-text-on-surface">
        <Body1 class="as-p-4 as-text-on-surface">Elevation 16</Body1>
      </Card>
      <Card :elevation="24" class="as-text-on-surface">
        <Body1 class="as-p-4 as-text-on-surface">Elevation 24</Body1>
      </Card>
      <Card :elevation="6" class="as-surface-primary as-text-on-primary">
        <Body1 class="as-p-4 as-text-on-primary">Primary</Body1>
      </Card>
      <Card :elevation="6" class="as-surface-primary-variant as-text-on-primary-variant">
        <Body1 class="as-p-4 as-text-on-primary-variant">Primary Variant</Body1>
      </Card>
      <Card :elevation="6" class="as-surface-secondary as-text-on-secondary">
        <Body1 class="as-p-4 as-text-on-secondary">Secondary</Body1>
      </Card>
      <Card :elevation="6" class="as-surface-secondary-variant as-text-on-secondary-variant">
        <Body1 class="as-p-4 as-text-on-secondary-variant">Secondary Variant</Body1>
      </Card>
      <Card :elevation="6" class="as-surface-success as-text-on-success">
        <Body1 class="as-p-4 as-text-on-success">Success</Body1>
      </Card>
      <Card :elevation="6" class="as-surface-error as-text-on-error">
        <Body1 class="as-p-4 as-text-on-error">Error</Body1>
      </Card>
    </div>
  </Group>
</template>
