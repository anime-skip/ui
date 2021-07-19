<template>
  <Group title="Inputs">
    <Subtitle1>Text Inputs</Subtitle1>
    <div class="grid grid-flow-row grid-cols-2 gap-4 mt-4">
      <TextInput placeholder="Blank" label="Label" />
      <TextInput placeholder="Filled" label="Label" default-value="Default value" />
      <TextInput placeholder="Disabled" disabled />
      <TextInput placeholder="Left icon">
        <template #left-icon="slotProps">
          <Icon
            :disabled="slotProps.disabled"
            :active="slotProps.focused"
            path="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
          />
        </template>
      </TextInput>
      <TextInput placeholder="Disabled" disabled default-value="Disabled value" />
      <TextInput placeholder="Right icon">
        <template #right-icon="slotProps">
          <Icon
            :disabled="slotProps.disabled"
            :active="slotProps.focused"
            path="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </template>
      </TextInput>
      <TextInput placeholder="Error" :is-valid="false" error-message="Enter a value" />
      <TextInput placeholder="Left and right icons">
        <template #left-icon="slotProps">
          <Icon
            :disabled="slotProps.disabled"
            :active="slotProps.focused"
            path="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
          />
        </template>
        <template #right-icon="slotProps">
          <Icon
            :disabled="slotProps.disabled"
            :active="slotProps.focused"
            path="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </template>
      </TextInput>
      <div />
      <TextInput placeholder="Right icon disabled" disabled>
        <template #right-icon="slotProps">
          <Icon
            :disabled="slotProps.disabled"
            :active="slotProps.focused"
            path="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </template>
      </TextInput>
    </div>
    <Subtitle1 class="mt-8">Checkboxes</Subtitle1>
    <div class="grid grid-flow-row grid-cols-4 gap-4 mt-4 items-start">
      <Checkbox v-model:checked="checkbox1" label="Checked" />
      <Checkbox v-model:checked="checkbox2" label="Indeterminate" />
      <Checkbox v-model:checked="checkbox3" label="Unchecked" />
      <Checkbox :checked="true" disabled label="Checked & disabled" />
      <Checkbox :checked="false" disabled label="Unchecked & disabled" />
      <Checkbox v-model:checked="checkbox4" r-to-l label="Right to Left" />
      <Checkbox v-model:checked="checkbox7">
        <div>
          <p>Custom Checkbox</p>
          <p>Custom Layout</p>
        </div>
      </Checkbox>
      <div />
      <RaisedCheckbox v-model:checked="checkbox5" label="Checked" />
      <RaisedCheckbox v-model:checked="checkbox6" label="Unchecked" />
      <RaisedCheckbox :checked="false" disabled label="Disabled" />
      <RaisedCheckbox checked disabled label="Checked + Disabled" />
    </div>
    <Subtitle1 class="mt-8">Raised Buttons</Subtitle1>
    <div class="grid grid-flow-row grid-cols-4 gap-4 mt-4 items-start">
      <RaisedButton>Primary</RaisedButton>
      <RaisedButton secondary>Secondary</RaisedButton>
      <RaisedButton dark>Dark</RaisedButton>
      <RaisedButton error>Error</RaisedButton>
      <RaisedButton disabled>Disabled Primary</RaisedButton>
      <RaisedButton disabled secondary>Disabled Secondary</RaisedButton>
      <RaisedButton disabled dark>Disabled Dark</RaisedButton>
      <RaisedButton disabled error>Disabled Error</RaisedButton>
      <RaisedButton link="#primary">Primary Link</RaisedButton>
      <RaisedButton secondary link="https://google.com" target="_blank"
        >Secondary Link</RaisedButton
      >
      <RaisedButton dark link="#dark">Dark Link</RaisedButton>
      <RaisedButton error link="#error">Error Link</RaisedButton>
    </div>
    <Subtitle1 class="mt-8">Flat Buttons</Subtitle1>
    <div class="grid grid-flow-row grid-cols-4 gap-4 mt-4 items-start">
      <FlatButton>Flat Primary</FlatButton>
      <FlatButton secondary>Flat Secondary</FlatButton>
      <FlatButton transparent>Flat Transparent</FlatButton>
      <FlatButton error>Flat Error</FlatButton>
      <FlatButton disabled>Flat Disabled Primary</FlatButton>
      <FlatButton disabled secondary>Flat Disabled Secondary</FlatButton>
      <FlatButton disabled transparent>Flat Disabled Transparent</FlatButton>
      <FlatButton disabled error>Flat Disabled Error</FlatButton>
      <FlatButton link="#primary">Flat Link Primary</FlatButton>
      <FlatButton link="https://google.com" target="_blank" secondary
        >Flat Link Secondary</FlatButton
      >
      <FlatButton link="#transparent" transparent>Flat Link Transparent</FlatButton>
      <FlatButton link="#error" error>Flat Link Error</FlatButton>
    </div>
  </Group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checkbox1 = ref(true);
    const checkbox2 = ref<boolean | 'indeterminate'>('indeterminate');
    const checkbox3 = ref(false);
    const checkbox4 = ref(false);
    const checkbox5 = ref(true);
    const checkbox6 = ref(false);
    const checkbox7 = ref(true);

    return {
      checkbox1,
      checkbox2,
      checkbox3,
      checkbox4,
      checkbox5,
      checkbox6,
      checkbox7,
    };
  },
});
</script>
