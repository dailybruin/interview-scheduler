import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Login extends Component {
  render()
  {
    return(
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <h2>Login</h2>
          </Col>
          <Col xs={6} md={4}>
            <h3>Login2</h3>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Login;
