<template>
  <Group title="Surfaces">
    <div class="grid grid-flow-row grid-cols-2 gap-4">
      <Card :elevation="0" class="text-on-surface">
        <Body1 class="p-4">Elevation 0</Body1>
      </Card>
      <Card class="text-on-surface">
        <Body1 class="p-4">Default, Elevation 1</Body1>
      </Card>
      <Card :elevation="2" class="text-on-surface">
        <Body1 class="p-4">Elevation 2</Body1>
      </Card>
      <Card :elevation="3" class="text-on-surface">
        <Body1 class="p-4">Elevation 3</Body1>
      </Card>
      <Card :elevation="4" class="text-on-surface">
        <Body1 class="p-4">Elevation 4</Body1>
      </Card>
      <Card :elevation="6" class="text-on-surface">
        <Body1 class="p-4">Elevation 6</Body1>
      </Card>
      <Card :elevation="8" class="text-on-surface">
        <Body1 class="p-4">Elevation 8</Body1>
      </Card>
      <Card :elevation="12" class="text-on-surface">
        <Body1 class="p-4">Elevation 12</Body1>
      </Card>
      <Card :elevation="16" class="text-on-surface">
        <Body1 class="p-4">Elevation 16</Body1>
      </Card>
      <Card :elevation="24" class="text-on-surface">
        <Body1 class="p-4">Elevation 24</Body1>
      </Card>
      <Card :elevation="6" class="surface-primary text-on-primary">
        <Body1 class="p-4">Primary</Body1>
      </Card>
      <Card :elevation="6" class="surface-primary-variant text-on-primary-variant">
        <Body1 class="p-4">Primary Variant</Body1>
      </Card>
      <Card :elevation="6" class="surface-secondary text-on-secondary">
        <Body1 class="p-4">Secondary</Body1>
      </Card>
      <Card :elevation="6" class="surface-secondary-variant text-on-secondary-variant">
        <Body1 class="p-4">Secondary Variant</Body1>
      </Card>
      <Card :elevation="6" class="surface-success text-on-success">
        <Body1 class="p-4">Success</Body1>
      </Card>
      <Card :elevation="6" class="surface-error text-on-error">
        <Body1 class="p-4">Error</Body1>
      </Card>
    </div>
  </Group>
</template>
