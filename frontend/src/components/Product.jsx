import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded" style={{ height: '400px' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ objectFit: 'cover', height: '80%' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Link to={`/product/${product._id}`}>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Link>
        </Card.Text>

        <Card.Text as="h5">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
