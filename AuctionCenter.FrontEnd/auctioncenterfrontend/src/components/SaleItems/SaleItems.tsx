import * as React from 'react';
import { ISaleItemsState } from './ISaleItemsState';
import { ISaleItemsProps } from './ISaleItemsProps';
import styles from './SaleItems.module.scss';
import { fetchClient } from '../../helpers/fetchClient';
import { Card, Button, Row, Col } from 'react-bootstrap';

class SaleItems extends React.Component<ISaleItemsProps, ISaleItemsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidUpdate(prevProps: any, PrevState: any) {
    const { selectedCategory } = this.props
    if (prevProps.selectedCategory != selectedCategory) {

      if (selectedCategory === "All Categories") {
        this.fetchItems()
        return
      }


    }
  }

  componentDidMount() {
    this.fetchItems()
  }

  fetchItems = async () => {
    const request = {}
    const response = await fetchClient.httpGetWithAuth('/api/SaleItems/getAll', request);
    if (response) {
      this.setState({
        items: response
      })
    }
  }

  renderItems = (items: any) => {
    if (items.length > 0)
      return items.map((i: any) =>
        (
          <Card className={`${styles.item}`}>
            <Row>
              <Col>
                <Card.Img className={`${styles.item}`} variant="top" src={`data:image/jpeg;base64,${i.image}`} width={150} height={150} />
              </Col>
              <Col xs={4}>
              <Card.Body  >
                <Card.Title>{i.itemName}</Card.Title>
                <Card.Text>
                  {i.description}
                </Card.Text>
              </Card.Body>
            </Col>
            <Col className={`${styles.action}`}>
              <Button variant="primary">Add to Cart</Button>
              <Card.Text>
                Price: ${i.price}
              </Card.Text>
             </Col>
              </Row>

          </Card>))

    return <p>Seems there are no items in sale left</p>
  }

  public render(): JSX.Element {
    const { items } = this.state;
    return (
      <div className={`${styles.saleItems}`}>
        <h3>Showing {this.props.selectedCategory} items</h3>
        {this.renderItems(items)}



      </div>
    );
  }
}

export default SaleItems;
