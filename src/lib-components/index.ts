import { App } from 'vue';

// Components
import RaisedButton from './RaisedButton.vue';
export { RaisedButton };
import RaisedContainer from './RaisedContainer.vue';
export { RaisedContainer };
import FlatButton from './FlatButton.vue';
export { FlatButton };
import NavBar from './NavBar.vue';
export { NavBar };
import Card from './Card.vue';
export { Card };
import TextInput from './TextInput.vue';
export { TextInput };
import Checkbox from './Checkbox.vue';
export { Checkbox };
import RaisedCheckbox from './RaisedCheckbox.vue';
export { RaisedCheckbox };
import Loading from './Loading.vue';
export { Loading };
import LoadingOverlay from './LoadingOverlay.vue';
export { LoadingOverlay };
import Slider from './Slider.vue';
export { Slider };
import Timeline from './Timeline.vue';
export { Timeline };

// Text
import Body1 from './text/Body1.vue';
export { Body1 };
import Body2 from './text/Body2.vue';
export { Body2 };
import Caption from './text/Caption.vue';
export { Caption };
import Overline from './text/Overline.vue';
export { Overline };
import Subtitle1 from './text/Subtitle1.vue';
export { Subtitle1 };
import Subtitle2 from './text/Subtitle2.vue';
export { Subtitle2 };

// Icons
import Icon from './icons/Icon.vue';
export { Icon };

export default function useComponents(app: App): void {
  app.component('RaisedContainer', RaisedContainer);
  app.component('RaisedButton', RaisedButton);
  app.component('FlatButton', FlatButton);
  app.component('NavBar', NavBar);
  app.component('Card', Card);
  app.component('TextInput', TextInput);
  app.component('Checkbox', Checkbox);
  app.component('RaisedCheckbox', RaisedCheckbox);
  app.component('Loading', Loading);
  app.component('LoadingOverlay', LoadingOverlay);
  app.component('Slider', Slider);
  app.component('Timeline', Timeline);

  app.component('Body1', Body1);
  app.component('Body2', Body2);
  app.component('Caption', Caption);
  app.component('Overline', Overline);
  app.component('Subtitle1', Subtitle1);
  app.component('Subtitle2', Subtitle2);

  app.component('Icon', Icon);
}
