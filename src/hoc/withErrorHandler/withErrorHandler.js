import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    }
    componentWillMount() {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });

      axios.interceptors.response.use(res => res, error => {
        this.setState({error});
      });
    }

    errorConfirmedHanler = () => {
      this.setState({error: null});
    }

    render() {
      return(
        <React.Fragment>
          <Modal
            show={!!this.state.error}
            modalClosed={this.errorConfirmedHanler}>
            {!!this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  }
}

export default withErrorHandler;