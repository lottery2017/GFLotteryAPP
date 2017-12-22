import { PureComponent ,Component} from 'react';
import Immutable from 'immutable';

export default class BaseComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const thisPropsIm = Immutable.fromJS(this.props);
    const thisStateIm = Immutable.fromJS(this.state);
    const nextPropsIm = Immutable.fromJS(nextProps);
    const nextStateIm = Immutable.fromJS(nextState);
    if (!Immutable.is(thisPropsIm, nextPropsIm) || !Immutable.is(thisStateIm, nextStateIm)) {
      return true;
    }
    return false;
  }
}
