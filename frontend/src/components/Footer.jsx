import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="footer-text">
      <Container>
        <Row>
          <Col className="d-flex justify-content-center align-items-center py-3 my-2">
            <p>eCommerce &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
