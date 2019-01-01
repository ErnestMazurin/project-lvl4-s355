import { reduxForm } from 'redux-form';

export default stateMapping => Component => reduxForm(stateMapping)(Component);
