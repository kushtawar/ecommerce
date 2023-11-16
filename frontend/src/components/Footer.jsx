import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="footer-text ">
      <Row className="d-flex justify-content-center align-items-center py-2">
        Flove &copy; {currentYear}
      </Row>
    </footer>
  );
};
export default Footer;
