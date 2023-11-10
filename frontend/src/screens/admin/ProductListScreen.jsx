import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  // OR if using state
  const { state } = useLocation();

  var updatedProductId = state?.updatedProductId;
  const updatedProductIdRef = useRef(updatedProductId);
  //console.log('updatedProductId in ProductList: ', updatedProductId);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success(`${id} deleted successfully`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  var shouldHighlight = localStorage.getItem('highlight');
  console.log('shouldHighlightinlist: ' + shouldHighlight);
  useEffect(() => {
    if (shouldHighlight === 'true') {
      //   console.log('Why am I reaching here::' + shouldHighlight);
      //   updatedProductId = updatedProductId;
      updatedProductIdRef.current = updatedProductId;
      localStorage.setItem('highlight', 'false');
    } else {
      console.log('Do I reach here? ' + shouldHighlight);
      updatedProductIdRef.current = null;
      localStorage.setItem('highlight', 'false');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldHighlight]);
  console.log('updatedProductId: ' + updatedProductIdRef.current);
  /* useEffect(() => {
    if (shouldHighlight === 'true') {
      //   console.log('Why am I reaching here::' + shouldHighlight);
      //   updatedProductId = updatedProductId;
      localStorage.setItem('highlight', 'false');
    } else {
      console.log('Do I reach here? ' + shouldHighlight);
      updatedProductId = null;
      localStorage.setItem('highlight', 'false');
    }
  }, [shouldHighlight]); */

  updatedProductId = shouldHighlight === 'true' ? updatedProductId : '';

  console.log('updatedProductId: ' + updatedProductId);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <>
          <div>ProductId is {updatedProductId}</div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className={
                    product._id === updatedProductId ? 'highlighted-row' : ''
                  }
                >
                  <td>
                    {product._id === updatedProductId ? '*' : ''}
                    {product._id}
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  {/* Indicator */}
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/*  <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
        </>
      )}
    </>
  );
};

export default ProductListScreen;
